export default (actions) => {
  const iter = ast => ast.reduce((acc, node) => `${acc}${actions[node.type](node, iter)}`, '');
  return iter;
};
