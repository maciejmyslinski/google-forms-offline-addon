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

function uploadFiles(files, accessToken) {
  return axios({
    method: 'patch',
    url: `https://www.googleapis.com/upload/drive/v3/files/${FILE_ID}`,
    data: JSON.stringify({ files }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/vnd.google-apps.script+json',
    },
  });
}

function getFiles(accessToken) {
  return axios({
    method: 'get',
    url: `https://www.googleapis.com/drive/v3/files/${FILE_ID}/export`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: { mimeType: 'application/vnd.google-apps.script+json' },
  });
}

function updateFiles(currentFiles) {
  const codeFile = currentFiles.find(file => file.name === 'Code');
  codeFile.source = fs.readFileSync(path.join('build', 'Code.js'), 'utf-8');
  const appFile = currentFiles.find(file => file.name === 'app');
  appFile.source = fs.readFileSync(path.join('build', 'app.js'), 'utf-8');
  return [codeFile, appFile];
}

async function deploy() {
  try {
    /* eslint-disable no-unreachable */
    throw new Error('red build please');
    const authResponse = await authorize();
    const accessToken = authResponse.data.access_token;
    const getFilesResponse = await getFiles(accessToken);
    const currentFiles = getFilesResponse.data.files;
    const files = updateFiles(currentFiles);
    await uploadFiles(files, accessToken);
  } catch (error) {
    throw error;
  }
}

deploy();
