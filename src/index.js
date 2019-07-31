import _ from 'lodash';
import getParseFiles from './parsers';
import actions from './actions';

const getAction = (key, file1, file2) => actions.find(({ check }) => check(key, file1, file2));

export default (pathToFile1, pathToFile2) => {
  const { parseFile1 } = getParseFiles(pathToFile1, pathToFile2);
  const { parseFile2 } = getParseFiles(pathToFile1, pathToFile2);
  const keys = _.uniq([...Object.keys(parseFile1), ...Object.keys(parseFile2)]);
  return keys.reduce((acc, key) => {
    const { process } = getAction(key, parseFile1, parseFile2);
    const result = process(key, parseFile1, parseFile2);
    return `${acc}\n${result}`;
  }, '');
};
