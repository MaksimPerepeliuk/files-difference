import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const getContent = (pathToFileBefore, pathToFileAfter) => {
  const contentFileBefore = fs.readFileSync(pathToFileBefore, 'utf-8');
  const contentFileAfter = fs.readFileSync(pathToFileAfter, 'utf-8');
  return { contentFileBefore, contentFileAfter };
};

export default (pathToFileBefore, pathToFileAfter) => {
  const { contentFileBefore, contentFileAfter } = getContent(pathToFileBefore, pathToFileAfter);
  const formatFile = path.extname(pathToFileBefore).slice(1);
  const parse = parsers[formatFile];
  const parsedFileBefore = parse(contentFileBefore);
  const parsedFileAfter = parse(contentFileAfter);
  return { parsedFileBefore, parsedFileAfter };
}