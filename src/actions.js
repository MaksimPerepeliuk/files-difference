import _ from 'lodash';

export default [
  {
    check: (key, file1, file2) => file1[key] === file2[key],
    process: (key, file1) => `  ${key}: ${file1[key]}`,
  },
  {
    check: (key, file1, file2) => (
      _.has(file2, key) && _.has(file1, key) && file1[key] !== file2[key]
    ),
    process: (key, file1, file2) => `+ ${key}: ${file2[key]}\n- ${key}: ${file1[key]}`,
  },
  {
    check: (key, file1, file2) => _.has(file1, key) && !_.has(file2, key),
    process: (key, file1) => `- ${key}: ${file1[key]}`,
  },
  {
    check: (key, file1, file2) => !_.has(file1, key) && _.has(file2, key),
    process: (key, file1, file2) => `+ ${key}: ${file2[key]}`,
  },
];
//
