import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (contentFileBefore, contentFileAfter, formatFile) => {
  const parse = parsers[formatFile];
  const parsedFileBefore = parse(contentFileBefore);
  const parsedFileAfter = parse(contentFileAfter);
  return { parsedFileBefore, parsedFileAfter };
};
