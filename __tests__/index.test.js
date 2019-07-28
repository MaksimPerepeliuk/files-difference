import fs from 'fs';
import gendiff from '../src';

const pathToFile1 = '__tests__/__fixtures__/before1.json';
const pathToFile2 = '__tests__/__fixtures__/after1.json';

test('gendiff', () => {
  fs.writeFileSync('__tests__/__fixtures__/correct-output1', gendiff(pathToFile1, pathToFile2));
  const correctOutput = fs.readFileSync('__tests__/__fixtures__/correct-output1', 'utf-8');
  expect(gendiff(pathToFile1, pathToFile2)).toBe(correctOutput);
});
