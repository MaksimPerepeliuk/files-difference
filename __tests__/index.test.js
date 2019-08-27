import fs from 'fs';
import gendiff from '../src';
import path from 'path';

const commonPath = '__tests__/__fixtures__/';

const dataForTest = [
  ['before.json', 'after.json', 'correct-output-flat'],
  ['before.yml', 'after.yml', 'correct-output-flat'],
  ['before.ini', 'after.ini', 'correct-output-flat'],
  ['before2.json', 'after2.json', 'correct-output-tree'],
  ['before2.yml', 'after2.yml', 'correct-output-tree'],
  ['before2.ini', 'after2.ini', 'correct-output-tree'],
  ['before2.json', 'after2.json', 'correct-output-plain', 'plain'],
  ['before2.yml', 'after2.yml', 'correct-output-plain', 'plain'],
  ['before2.ini', 'after2.ini', 'correct-output-plain', 'plain'],
  ['before2.json', 'after2.json', 'correct-output-json', 'json'],
  ['before2.yml', 'after2.yml', 'correct-output-json', 'json'],
  ['before2.ini', 'after2.ini', 'correct-output-json', 'json'],
];

test.each(dataForTest)(
  'compare two files (%s, %s)',
  (path1, path2, expected, format = 'tree') => {
    const pathToFile1 = path.join(commonPath, path1);
    const pathToFile2 = path.join(commonPath, path2);
    const correctOutput = fs.readFileSync(path.join(commonPath, expected), 'utf-8');
    expect(gendiff(pathToFile1, pathToFile2, format)).toBe(correctOutput);
  },
);