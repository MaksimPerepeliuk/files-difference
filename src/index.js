import getParseFiles from './parsers';
import buildAst from './ast';
import render from './render';
import actionsForTree from './formatters/tree';
import actionsForPlain from './formatters/plain';

const renders = {
  plain: render(actionsForPlain),
  tree: render(actionsForTree),
  json: JSON.stringify,
};

export default (pathToFileBefore, pathToFileAfter, type = 'tree') => {
  const { parsedFileBefore, parsedFileAfter } = getParseFiles(pathToFileBefore, pathToFileAfter);
  const ast = buildAst(parsedFileBefore, parsedFileAfter);
  const outputContent = type === 'tree' ? `{${renders[type](ast)}\n}` : renders[type](ast);
  return outputContent;
};
