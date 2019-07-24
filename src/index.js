import _ from 'lodash';
import fs from 'fs';

const actions = [
  {
    check: (key, fileParse1, fileParse2) => fileParse1[key] === fileParse2[key],
    process: (key, fileParse1) => `  ${key}: ${fileParse1[key]}`,
  },
  {
    check: (key, fileParse1, fileParse2) => (
      _.has(fileParse2, key) && _.has(fileParse1, key) && fileParse1[key] !== fileParse2[key]
    ),
    process: (key, fileParse1, fileParse2) => `+ ${key}: ${fileParse2[key]}\n- ${key}: ${fileParse1[key]}`,
  },
  {
    check: (key, fileParse1, fileParse2) => _.has(fileParse1, key) && !_.has(fileParse2, key),
    process: (key, fileParse1) => `- ${key}: ${fileParse1[key]}`,
  },
  {
    check: (key, fileParse1, fileParse2) => !_.has(fileParse1, key) && _.has(fileParse2, key),
    process: (key, fileParse1, fileParse2) => `+ ${key}: ${fileParse2[key]}`,
  },
];

const getAction = (key, file1, file2) => actions.find(({ check }) => check(key, file1, file2));

export default (file1Path1, filePath2) => {
  const fileParse1 = JSON.parse(fs.readFileSync(file1Path1));
  const fileParse2 = JSON.parse(fs.readFileSync(filePath2));
  const keys = _.uniq([...Object.keys(fileParse1), ...Object.keys(fileParse2)]);
  const str = keys.reduce((acc, key) => {
    const { process } = getAction(key, fileParse1, fileParse2);
    const action = process(key, fileParse1, fileParse2);
    return `${acc}\n${action}`;
  }, '');
  return str;
};
