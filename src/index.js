import fs from 'fs';
import path from 'path';
import getParsedFiles from './parsers';
import buildAst from './ast';
import render from './render';

const getContent = pathToFile => fs.readFileSync(pathToFile, 'utf-8');

export default (pathToFileBefore, pathToFileAfter, type = 'tree') => {
  const contentFileBefore = getContent(pathToFileBefore);
  const contentFileAfter = getContent(pathToFileAfter);
  const formatFile = path.extname(pathToFileBefore).slice(1);
  const {
    parsedFileBefore,
    parsedFileAfter,
  } = getParsedFiles(contentFileBefore, contentFileAfter, formatFile);
  const ast = buildAst(parsedFileBefore, parsedFileAfter);
  const outputContent = render(ast, type);
  return outputContent;
};
