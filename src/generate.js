import { readFileSync, writeFileSync } from 'fs';
import { mergeTypes } from './mergeTypes';
import { printTypes } from './printTypes';

export const generate = (
  cwd,
  path,
  shouldOutputOptionalTypes = false,
  indentationSize = 2,
  shouldMerge = false,
  defaults = []
) => {
  let file;
  try {
    file = readFileSync(`${cwd}/${path}`);
  } catch {
    console.error('invalid path to .env file');
    process.exit(1);
  }
  let variables = file.toString().match(/(?<=^\s*)\w+(?==.+$)/gm);
  try {
    if (!variables) throw new Error();
  } catch {
    console.error('Empty .env file');
    process.exit(1);
  }

  // merge defaults
  variables = variables.concat(defaults);
  variables = variables.filter((item, pos) => variables.indexOf(item) === pos);

  let outPath = path.match(/[.\w\-/]*\/(?=\.env)/);
  outPath = outPath ? `${outPath}/` : '';

  let mappedTypes = variables.map((v) => {
    return `${v}${shouldOutputOptionalTypes ? '?' : ''}: string`;
  });

  if (shouldMerge) {
    mappedTypes = mergeTypes(mappedTypes, `${cwd}/${outPath}env.d.ts`);
  }

  const typeDeclaration = printTypes(indentationSize, mappedTypes);

  writeFileSync(`${cwd}/${outPath}env.d.ts`, typeDeclaration);

  return Buffer.from(typeDeclaration);
};
