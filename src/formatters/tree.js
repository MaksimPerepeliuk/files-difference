import _ from 'lodash';

const getSpaces = elem => (elem.depth > 2 ? ' '.repeat(elem.depth) : '');

const objectToString = (value) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return `{\n${keys.map(elem => `      ${getSpaces(value)}${elem}: ${value[elem]}`).join('\n')}\n  }`;
  }

  return value;
};

const renderActions = {
  tree: (node, fn) => `\n${getSpaces(node)}${node.key}: {${fn(node.children)}\n${getSpaces(node)}}`,
  removed: node => `\n${getSpaces(node)}- ${node.key}: ${objectToString(node.before)}`,
  added: node => `\n${getSpaces(node)}+ ${node.key}: ${objectToString(node.after)}`,
  changed: node => (
    `\n${getSpaces(node)}- ${node.key}: ${objectToString(node.before)} \n${getSpaces(node)}+ ${node.key}: ${objectToString(node.after)}`
  ),
  unchanged: node => `\n  ${getSpaces(node)}${node.key}: ${objectToString(node.before)}`,
};

const renderForTree = ast => ast.reduce((acc, node) => `${acc}${renderActions[node.type](node, renderForTree)}`, '');

export default renderForTree;
