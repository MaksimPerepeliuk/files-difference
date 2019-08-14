import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (pathToFileBefore, pathToFileAfter) => {
  const formatFile = path.extname(pathToFileBefore).slice(1);
  const parse = parsers[formatFile];
  const parsedFileBefore = parse(fs.readFileSync(pathToFileBefore, 'utf-8'));
  const parsedFileAfter = parse(fs.readFileSync(pathToFileAfter, 'utf-8'));
  return { parsedFileBefore, parsedFileAfter };
};
