import renderTreeFormat from './tree';
import renderPlainFormat from './plain';

const renders = {
  tree: renderTreeFormat,
  plain: renderPlainFormat,
  json: JSON.stringify,
};

export default (ast, format) => renders[format](ast);
