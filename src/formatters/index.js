import actionsForTree from './tree';
import actionsForPlain from './plain';

export default {
  plain: actionsForPlain,
  tree: actionsForTree,
  json: JSON.stringify,
};
