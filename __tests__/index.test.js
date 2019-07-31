import fs from 'fs';
import gendiff from '../src';

const pathToFileJson1 = '__tests__/__fixtures__/before1.json';
const pathToFileJson2 = '__tests__/__fixtures__/after1.json';
const pathToFileYaml1 = '__tests__/__fixtures__/before.yml';
const pathToFileYaml2 = '__tests__/__fixtures__/after.yml';
fs.writeFileSync('__tests__/__fixtures__/correct-output1', gendiff(pathToFileJson1, pathToFileJson2));
const correctOutput = fs.readFileSync('__tests__/__fixtures__/correct-output1', 'utf-8');

test('compare format .json', () => {
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(correctOutput);
});

test('compare format .yml', () => {
  expect(gendiff(pathToFileYaml1, pathToFileYaml2)).toBe(correctOutput);
});
