import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const getParser = type => parsers[type];

export default (pathToFile1, pathToFile2) => {
  const formatFiles = path.extname(pathToFile1).slice(1);
  const parse = getParser(formatFiles);
  const parseFile1 = parse(fs.readFileSync(pathToFile1));
  const parseFile2 = parse(fs.readFileSync(pathToFile2));
  return { parseFile1, parseFile2 };
};
