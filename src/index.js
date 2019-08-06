import getParseFiles from './parsers';
import getAst from './ast';
import renderAst from './render';

export default (pathToFile1, pathToFile2) => {
  const { parseFile1 } = getParseFiles(pathToFile1, pathToFile2);
  const { parseFile2 } = getParseFiles(pathToFile1, pathToFile2);
  return renderAst(getAst(parseFile1, parseFile2));
};
