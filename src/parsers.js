import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (contentFile, formatFile) => {
  const parser = parsers[formatFile];
  const parsedFile = parser(contentFile);
  return parsedFile;
};
