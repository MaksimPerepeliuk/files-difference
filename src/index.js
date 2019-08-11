import getParseFiles from './parsers';
import buildAst from './ast';
import renderForTree from './formatters/tree';
import renderForPlain from './formatters/plain';

const renders = {
  plain: renderForPlain,
  tree: renderForTree,
};

export default (pathToFile1, pathToFile2, type = 'tree') => {
  const { parseFile1 } = getParseFiles(pathToFile1, pathToFile2);
  const { parseFile2 } = getParseFiles(pathToFile1, pathToFile2);
  return renders[type](buildAst(parseFile1, parseFile2));
};
