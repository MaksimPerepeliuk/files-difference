import _ from 'lodash';

const indentation = 4;
const subIndentation = 2;

const makeSpaces = (depth, sub = 0, add = 0) => ' '.repeat(depth * indentation - sub + add);

const objectToString = (value, parent) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return `{\n${keys.map(elem => `${makeSpaces(parent, 0, indentation)}${elem}: ${value[elem]}`).join('\n')}\n${makeSpaces(parent)}}`;
  }

  return value;
};

const treeFormatActions = {
  tree: (node, depth, fn) => `\n${makeSpaces(depth)}${node.key}: {${fn(node.children, depth + 1)}\n${makeSpaces(depth)}}`,
  removed: (node, depth) => `\n${makeSpaces(depth, subIndentation)}- ${node.key}: ${objectToString(node.beforeValue, depth)}`,
  added: (node, depth) => `\n${makeSpaces(depth, subIndentation)}+ ${node.key}: ${objectToString(node.afterValue, depth)}`,
  changed: (node, depth) => {
    const removed = `${makeSpaces(depth, subIndentation)}- ${node.key}: ${objectToString(node.beforeValue, depth)}`;
    const added = `${makeSpaces(depth, subIndentation)}+ ${node.key}: ${objectToString(node.afterValue, depth)}`;
    return `\n${removed} \n${added}`;
  },
  unchanged: (node, depth) => `\n${makeSpaces(depth)}${node.key}: ${objectToString(node.beforeValue, depth)}`,
};


const processAst = (ast, indent = 1) => (
  ast.reduce((acc, node) => `${acc}${treeFormatActions[node.type](node, indent, processAst)}`, '')
);

export default ast => `{${processAst(ast)}\n}`;
