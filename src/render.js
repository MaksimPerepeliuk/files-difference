import formatters from './formatters/index';

const processAst = (format) => {
  const renderFormat = formatters[format];
  const toString = ast => ast.reduce((acc, node) => {
    if (format === 'json') {
      return renderFormat(ast);
    }

    return `${acc}${renderFormat[node.type](node, toString)}`;
  }, '');

  return toString;
};

export default (ast, format) => (format === 'tree' ? `{${processAst(format)(ast)}\n}` : processAst(format)(ast));
