import getParseFiles from './parsers';
import buildAst from './ast';
import renderForTree from './formatters/tree';
import renderForPlain from './formatters/plain';

const renders = {
  plain: renderForPlain,
  tree: renderForTree,
  json: JSON.stringify,
};

export default (pathToFileBefore, pathToFileAfter, type = 'tree') => {
  const { parsedFileBefore, parsedFileAfter } = getParseFiles(pathToFileBefore, pathToFileAfter);
  return renders[type](buildAst(parsedFileBefore, parsedFileAfter));
};
