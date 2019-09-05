import _ from 'lodash';

const buildPropertyPath = (node, parents) => (
  parents.length === 0 ? node.key : `${parents.join('.')}.${node.key}`
);

const valueToString = value => (_.isObject(value) ? '[complex value]' : value);

const plainFormatActions = {
  tree: (node, parent, fn) => fn(node.children, [...parent, node.key]),
  removed: (node, parent) => `Property '${buildPropertyPath(node, parent)}' was removed\n`,
  added: (node, parent) => `Property '${buildPropertyPath(node, parent)}' was added with value: ${valueToString(node.afterValue)}\n`,
  changed: (node, parent) => (
    `Property '${buildPropertyPath(node, parent)}' was updated. From '${valueToString(node.beforeValue)} to ${valueToString(node.afterValue)}'\n`
  ),
  unchanged: (node, parent) => `Property '${buildPropertyPath(node, parent)}' was not updated\n`,
};

const renderPlainFormat = (ast, parent = []) => (
  ast.reduce((acc, node) => `${acc}${plainFormatActions[node.type](node, parent, renderPlainFormat)}`, '')
);

export default renderPlainFormat;
