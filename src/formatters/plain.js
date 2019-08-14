import _ from 'lodash';

const buildPropertyPath = node => (
  node.parents.length === 0 ? node.key : `${node.parents.join('.')}.${node.key}`
);

const valueToString = value => (_.isObject(value) ? '[complex value]' : value);

const actionsForRender = {
  tree: (node, fn) => fn(node.children),
  removed: node => `Property '${buildPropertyPath(node)}' was removed\n`,
  added: node => `Property '${buildPropertyPath(node)}' was added with value: ${valueToString(node.after)}\n`,
  changed: node => `Property '${buildPropertyPath(node)}' was updated. From '${valueToString(node.before)} to ${valueToString(node.after)}'\n`,
  unchanged: node => `Property '${buildPropertyPath(node)}' was not updated\n`,
};

const renderForPlain = ast => ast.reduce((acc, node) => `${acc}${actionsForRender[node.type](node, renderForPlain)}`, '');

export default renderForPlain;
