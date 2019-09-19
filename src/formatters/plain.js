import _ from 'lodash';

const buildPropertyPath = (node, ancestry) => (
  ancestry.length === 0 ? node.key : `${ancestry.join('.')}.${node.key}`
);

const valueToString = value => (_.isObject(value) ? '[complex value]' : value);

const plainFormatActions = {
  tree: (node, ancestry, fn) => fn(node.children, [...ancestry, node.key]),
  removed: (node, ancestry) => `Property '${buildPropertyPath(node, ancestry)}' was removed`,
  added: (node, ancestry) => `Property '${buildPropertyPath(node, ancestry)}' was added with value: ${valueToString(node.afterValue)}`,
  changed: (node, ancestry) => (
    `Property '${buildPropertyPath(node, ancestry)}' was updated. From '${valueToString(node.beforeValue)} to ${valueToString(node.afterValue)}'`
  ),
  unchanged: (node, ancestry) => `Property '${buildPropertyPath(node, ancestry)}' was not updated`,
};

const renderPlainFormat = (ast, ancestry = []) => (
  ast.map(node => `${plainFormatActions[node.type](node, ancestry, renderPlainFormat)}`)
    .join('\n')
);

export default renderPlainFormat;
