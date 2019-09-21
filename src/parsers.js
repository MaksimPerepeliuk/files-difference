import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

export default (content, dataType) => {
  const parse = parsers[dataType];
  return parse(content);
};
