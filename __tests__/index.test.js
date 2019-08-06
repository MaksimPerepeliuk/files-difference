import fs from 'fs';
import gendiff from '../src';

const pathToFileJson1 = '__tests__/__fixtures__/JSON/before1.json';
const pathToFileJson2 = '__tests__/__fixtures__/JSON/after1.json';
const pathToFileJson3 = '__tests__/__fixtures__/JSON/before2.json';
const pathToFileJson4 = '__tests__/__fixtures__/JSON/after2.json';
const pathToFileYaml1 = '__tests__/__fixtures__/YAML/before.yml';
const pathToFileYaml2 = '__tests__/__fixtures__/YAML/after.yml';
const pathToFileYaml3 = '__tests__/__fixtures__/YAML/before2.yml';
const pathToFileYaml4 = '__tests__/__fixtures__/YAML/after2.yml';
const pathToFileIni1 = '__tests__/__fixtures__/ini/before.ini';
const pathToFileIni2 = '__tests__/__fixtures__/ini/after.ini';
const pathToFileIni3 = '__tests__/__fixtures__/ini/before2.ini';
const pathToFileIni4 = '__tests__/__fixtures__/ini/after2.ini';
fs.writeFileSync('__tests__/__fixtures__/correct-output1', gendiff('__tests__/__fixtures__/JSON/before1.json', '__tests__/__fixtures__/JSON/after1.json'));
const correctOutput = fs.readFileSync('__tests__/__fixtures__/correct-output1', 'utf-8');
fs.writeFileSync('__tests__/__fixtures__/correct-output2', gendiff('__tests__/__fixtures__/JSON/before2.json', '__tests__/__fixtures__/JSON/after2.json'));
const correctOutput2 = fs.readFileSync('__tests__/__fixtures__/correct-output2', 'utf-8');

test('compare format .json', () => {
  expect(gendiff(pathToFileJson1, pathToFileJson2)).toBe(correctOutput);
});

test('compare format .yml', () => {
  expect(gendiff(pathToFileYaml1, pathToFileYaml2)).toBe(correctOutput);
});

test('compare format .ini', () => {
  expect(gendiff(pathToFileIni1, pathToFileIni2)).toBe(correctOutput);
});

test('compare tree format .json', () => {
  expect(gendiff(pathToFileJson3, pathToFileJson4)).toBe(correctOutput2);
});

test('compare tree format .yml', () => {
  expect(gendiff(pathToFileYaml3, pathToFileYaml4)).toBe(correctOutput2);
});

test('compare tree format .ini', () => {
  expect(gendiff(pathToFileIni3, pathToFileIni4)).toBe(correctOutput2);
});
