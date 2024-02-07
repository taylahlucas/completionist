import '@babel/polyfill';
import { globSync } from 'glob';
import fs from 'fs';
import last from 'lodash/last';

const localesPattern = './translations/*/*.json';
const resourcesDir = './src/i18n/locales/';
const resourcesFile = resourcesDir + 'resources.json';

if (fs.existsSync(resourcesFile)) {
  fs.unlinkSync(resourcesFile);
}

const files = globSync(localesPattern);

const data: any = {};
files.forEach(file => {
  const filenameArr = file.split('/');
  const locale = filenameArr[filenameArr.length - 2];
  const namespace = last<string>(filenameArr)?.split('.json')[0] ?? '';
  data[locale] = { ...data[locale], [namespace]: JSON.parse(fs.readFileSync(file, 'utf8')) };
});

if (!fs.existsSync(resourcesDir)) {
  fs.mkdirSync(resourcesDir);
}

fs.writeFileSync(resourcesFile, JSON.stringify(data, null, 2));
console.log('Generated file:', resourcesFile);
