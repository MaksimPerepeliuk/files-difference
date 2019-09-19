import _ from 'lodash';

const indentation = 4;
const subIndent = 2;

const makeSpaces = (indent, sub = 0) => ' '.repeat(indent - sub);

const stringify = (value, indent = 0) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const stringsFromKeys = keys
    .map(key => `${makeSpaces(indent, subIndent)}  ${key}: ${stringify(value[key], indent + indentation)}`)
    .join('\n');
  return `{\n${stringsFromKeys}\n${makeSpaces(indent, indentation)}}`;
};

const formatElement = {
  tree: (indent, element, f) => `${makeSpaces(indent)}${element.key}: ${f(element.children, indent + indentation)}`,
  removed: (indent, element) => `${makeSpaces(indent, subIndent)}- ${element.key}: ${stringify(element.beforeValue, indent + indentation)}`,
  added: (indent, element) => `${makeSpaces(indent, subIndent)}+ ${element.key}: ${stringify(element.afterValue, indent + indentation)}`,
  changed: (indent, element) => [
    `${makeSpaces(indent, subIndent)}+ ${element.key}: ${stringify(element.afterValue, indent + indentation)}`,
    `${makeSpaces(indent, subIndent)}- ${element.key}: ${stringify(element.beforeValue, indent + indentation)}`,
  ],
  unchanged: (indent, element) => `${makeSpaces(indent)}${element.key}: ${element.beforeValue}`,
};

const renderTreeFormat = (astTree, indent = indentation) => {
  const stringsFromTree = astTree
    .map(node => formatElement[node.type](indent, node, renderTreeFormat));
  const resultStrings = _.flatten(stringsFromTree).join('\n');

  return `{\n${resultStrings}\n${makeSpaces(indent, indentation)}}`;
};

export default renderTreeFormat;
