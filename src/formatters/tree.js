import _ from 'lodash';

const getSpaces = (depth, mul = 1) => ' '.repeat(depth * mul);

const objectToString = (value, depth) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return `{\n${getSpaces(depth)}${keys.map(elem => `${getSpaces(depth, 2)}${elem}: ${value[elem]}`).join('\n')}\n${getSpaces(depth)}}`;
  }

  return value;
};

const renderActions = {
  tree: (node, fn) => `\n${getSpaces(node.depth)}${node.key}: {${fn(node.children)}\n${getSpaces(node.depth)}}`,
  removed: node => `\n${getSpaces(node.depth)}- ${node.key}: ${objectToString(node.before, node.depth)}`,
  added: node => `\n${getSpaces(node.depth)}+ ${node.key}: ${objectToString(node.after, node.depth)}`,
  changed: node => (
    `\n${getSpaces(node.depth)}- ${node.key}: ${objectToString(node.before, node.depth)} \n${getSpaces(node.depth)}+ ${node.key}: ${objectToString(node.after, node.depth)}`
  ),
  unchanged: node => `\n  ${getSpaces(node.depth)}${node.key}: ${objectToString(node.before, node.depth)}`,
};

const renderForTree = ast => ast.reduce((acc, node) => `${acc}${renderActions[node.type](node, renderForTree)}`, '');

export default renderForTree;
