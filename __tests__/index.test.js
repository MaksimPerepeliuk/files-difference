import fs from 'fs';
import gendiff from '../src';

const correctOutputTree1 = fs.readFileSync('__tests__/__fixtures__/correct-output-tree1', 'utf-8');
const correctOutputTree2 = fs.readFileSync('__tests__/__fixtures__/correct-output-tree2', 'utf-8');
const correctOutputPlain1 = fs.readFileSync('__tests__/__fixtures__/correct-output-plain1', 'utf-8');
const correctOutputPlain2 = fs.readFileSync('__tests__/__fixtures__/correct-output-plain2', 'utf-8');
const correctOutputJson = fs.readFileSync('__tests__/__fixtures__/correct-output-json', 'utf-8');
const correctOutputJson2 = fs.readFileSync('__tests__/__fixtures__/correct-output-json2', 'utf-8');

const pathes = [
  ['__tests__/__fixtures__/JSON/before1.json', '__tests__/__fixtures__/JSON/after1.json', correctOutputTree1],
  ['__tests__/__fixtures__/JSON/before2.json', '__tests__/__fixtures__/JSON/after2.json', correctOutputTree2],
  ['__tests__/__fixtures__/YAML/before.yml', '__tests__/__fixtures__/YAML/after.yml', correctOutputTree1],
  ['__tests__/__fixtures__/YAML/before2.yml', '__tests__/__fixtures__/YAML/after2.yml', correctOutputTree2],
  ['__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', correctOutputTree1],
  ['__tests__/__fixtures__/ini/before2.ini', '__tests__/__fixtures__/ini/after2.ini', correctOutputTree2],
];

const pathes2 = [
  ['__tests__/__fixtures__/JSON/before1.json', '__tests__/__fixtures__/JSON/after1.json', correctOutputPlain1],
  ['__tests__/__fixtures__/JSON/before2.json', '__tests__/__fixtures__/JSON/after2.json', correctOutputPlain2],
  ['__tests__/__fixtures__/YAML/before.yml', '__tests__/__fixtures__/YAML/after.yml', correctOutputPlain1],
  ['__tests__/__fixtures__/YAML/before2.yml', '__tests__/__fixtures__/YAML/after2.yml', correctOutputPlain2],
  ['__tests__/__fixtures__/ini/before.ini', '__tests__/__fixtures__/ini/after.ini', correctOutputPlain1],
  ['__tests__/__fixtures__/ini/before2.ini', '__tests__/__fixtures__/ini/after2.ini', correctOutputPlain2],
];

const pathes3 = [
  ['__tests__/__fixtures__/JSON/before1.json', '__tests__/__fixtures__/JSON/after1.json', correctOutputJson],
  ['__tests__/__fixtures__/JSON/before2.json', '__tests__/__fixtures__/JSON/after2.json', correctOutputJson2],
  ['__tests__/__fixtures__/YAML/before.yml', '__tests__/__fixtures__/YAML/after.yml', correctOutputJson],
  ['__tests__/__fixtures__/YAML/before2.yml', '__tests__/__fixtures__/YAML/after2.yml', correctOutputJson2],
  ['__tests__/__fixtures__/ini/before2.ini', '__tests__/__fixtures__/ini/after2.ini', correctOutputJson2],
];

test.each(pathes)(
  'compare two files "tree" format(%s, %s)',
  (path1, path2, expected) => {
    expect(gendiff(path1, path2)).toBe(expected);
  },
);

test.each(pathes2)(
  'compare two files "plain" format(%s, %s)',
  (path1, path2, expected) => {
    expect(gendiff(path1, path2, 'plain')).toBe(expected);
  },
);

test.each(pathes3)(
  'compare two files "json" format(%s, %s)',
  (path1, path2, expected) => {
    expect(gendiff(path1, path2, 'json')).toBe(expected);
  },
);