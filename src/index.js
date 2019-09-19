import fs from 'fs';
import path from 'path';
import getParsedFiles from './parsers';
import buildAst from './ast';
import render from './formatters';

const getParsedContentFile = (pathToFile) => {
  const contentFile = fs.readFileSync(pathToFile, 'utf-8');
  const formatFile = path.extname(pathToFile).slice(1);
  return getParsedFiles(contentFile, formatFile);
};

export default (pathToFileBefore, pathToFileAfter, format = 'tree') => {
  const parsedFileBefore = getParsedContentFile(pathToFileBefore);
  const parsedFileAfter = getParsedContentFile(pathToFileAfter);
  const ast = buildAst(parsedFileBefore, parsedFileAfter);
  return render(ast, format);
};
