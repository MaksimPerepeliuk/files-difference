import renderTreeFormat from './tree';
import renderPlainFormat from './plain';

export default {
  tree: renderTreeFormat,
  plain: renderPlainFormat,
  json: JSON.stringify,
};
