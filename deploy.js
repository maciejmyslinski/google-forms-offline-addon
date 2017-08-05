// we need to import devDependency here
// becaouse it's a deployment script
/* eslint-disable import/no-extraneous-dependencies */
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';
import fs from 'fs';
import path from 'path';

config();

const SCOPE = 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.scripts';
const EXPIRATION_TIME = '15m';
const AUDIENCE = 'https://www.googleapis.com/oauth2/v4/token';
const ALG = 'RS256';
const TYP = 'JWT';
const PRIVATE_KEY = process.env.privateKey.replace(/\\n/g, '\n');
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:jwt-bearer';
const FILE_ID = process.env.fileId;

const jwtData = {
  claimSet: {
    scope: SCOPE,
  },
  options: {
    expiresIn: EXPIRATION_TIME,
    issuer: process.env.clientEmail,
    subject: process.env.userEmail,
    audience: AUDIENCE,
    header: {
      alg: ALG,
      typ: TYP,
    },
  },
};

const jwtToken = jwt.sign(jwtData.claimSet, PRIVATE_KEY, jwtData.options);

function authorize() {
  return axios.post(
    AUDIENCE,
    querystring.stringify({
      grant_type: GRANT_TYPE,
      assertion: jwtToken,
    }),
  );
}

function uploadFiles(accessToken) {
  const files = [
    {
      name: 'Code.js',
      type: 'server_js',
      source: fs.readFileSync(path.join('build', 'Code.js'), 'utf-8'),
    },
    {
      name: 'app.js',
      type: 'server_js',
      source: fs.readFileSync(path.join('build', 'app.js'), 'utf-8'),
    },
  ];
  return axios({
    method: 'patch',
    url: `https://www.googleapis.com/upload/drive/v3/files/${FILE_ID}`,
    data: JSON.stringify({ files }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/vnd.google-apps.script+json',
      'Content-Length': Buffer.byteLength(JSON.stringify({ files }), 'utf-8'),
    },
    params: querystring.stringify({ uploadType: 'media' }),
  });
}

async function deploy() {
  try {
    const authResponse = await authorize();
    const accessToken = authResponse.data.access_token;
    uploadFiles(accessToken);
  } catch (error) {
    console.log(error);
  }
}

deploy();
