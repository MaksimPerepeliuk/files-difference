import _ from 'lodash';

const getSpaces = elem => (elem.depth > 2 ? ' '.repeat(elem.depth) : '');

const objectToString = (value) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return `{\n${keys.map(elem => `      ${getSpaces(value)}${elem}: ${value[elem]}`).join('\n')}\n  }`;
  }

  return value;
};

const renderActions = [
  {
    check: type => type === 'tree',
    process: (node, fn) => `\n${getSpaces(node)}${node.key}: {${fn(node.children)}\n${getSpaces(node)}}`,
  },
  {
    check: type => type === 'removed',
    process: node => `\n${getSpaces(node)}- ${node.key}: ${objectToString(node.before)}`,
  },
  {
    check: type => type === 'added',
    process: node => `\n${getSpaces(node)}+ ${node.key}: ${objectToString(node.after)}`,
  },
  {
    check: type => type === 'changed',
    process: node => (
      `\n${getSpaces(node)}- ${node.key}: ${objectToString(node.before)} \n${getSpaces(node)}+ ${node.key}: ${objectToString(node.after)}`
    ),
  },
  {
    check: type => type === 'unchanged',
    process: node => `\n  ${getSpaces(node)}${node.key}: ${objectToString(node.before)}`,
  },
];

const getActionforRender = nodeType => renderActions.find(({ check }) => check(nodeType));

const render = ast => ast.reduce((acc, node) => {
  const { process } = getActionforRender(node.type);
  const result = process(node, render);
  return `${acc}${result}`;
}, '');

export default render;
