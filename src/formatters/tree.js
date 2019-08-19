import _ from 'lodash';

const getSpaces = (depth = 2, mul = 1) => ' '.repeat(depth * mul);

const objectToString = (value) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    const depthForObj = 2;
    return `{\n${getSpaces(depthForObj)}${keys.map(elem => `${getSpaces(depthForObj, 2)}${elem}: ${value[elem]}`).join('\n')}\n${getSpaces(depthForObj)}}`;
  }

  return value;
};

export default {
  tree: (node, fn) => `\n${getSpaces(node.depth)}${node.key}: {${fn(node.children)}\n${getSpaces(node.depth)}}`,
  removed: node => `\n${getSpaces(node.depth)}- ${node.key}: ${objectToString(node.before, node.depth)}`,
  added: node => `\n${getSpaces(node.depth)}+ ${node.key}: ${objectToString(node.after, node.depth)}`,
  changed: node => (
    `\n${getSpaces(node.depth)}- ${node.key}: ${objectToString(node.before, node.depth)} \n${getSpaces(node.depth)}+ ${node.key}: ${objectToString(node.after, node.depth)}`
  ),
  unchanged: node => `\n  ${getSpaces(node.depth)}${node.key}: ${objectToString(node.before, node.depth)}`,
};
