import _ from 'lodash';

const indentation = 4;
const subIndentation = 2;

const makeSpaces = (node, sub = 0, add = 0) => ' '.repeat(node.depth * indentation - sub + add);

const objectToString = (value, parent) => {
  if (_.isObject(value)) {
    const keys = Object.keys(value);
    return `{\n${keys.map(elem => `${makeSpaces(parent, 0, indentation)}${elem}: ${value[elem]}`).join('\n')}\n${makeSpaces(parent)}}`;
  }

  return value;
};

export default {
  tree: (node, fn) => `\n${makeSpaces(node)}${node.key}: {${fn(node.children)}\n${makeSpaces(node)}}`,
  removed: node => `\n${makeSpaces(node, subIndentation)}- ${node.key}: ${objectToString(node.before, node)}`,
  added: node => `\n${makeSpaces(node, subIndentation)}+ ${node.key}: ${objectToString(node.after, node)}`,
  changed: (node) => {
    const removed = `${makeSpaces(node, subIndentation)}- ${node.key}: ${objectToString(node.before, node)}`;
    const added = `${makeSpaces(node, subIndentation)}+ ${node.key}: ${objectToString(node.after, node)}`;
    return `\n${removed} \n${added}`;
  },
  unchanged: node => `\n${makeSpaces(node)}${node.key}: ${objectToString(node.before, node)}`,
};
