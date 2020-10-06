import { readFileSync, writeFileSync } from 'fs';
import { printTypes } from './printTypes';

export const generate = (
  cwd,
  path,
  shouldOutputOptionalTypes = false,
  indentationSize = 2
) => {
  let file;
  try {
    file = readFileSync(`${cwd}/${path}`);
  } catch {
    console.error('invalid path to .env file');
    process.exit(1);
  }

  const variables = file.toString().match(/(?<=\s*)\w+(?==)/gm);
  try {
    if (!variables) throw new Error();
  } catch {
    console.error('Empty .env file');
    process.exit(1);
  }

  let outPath = path.match(/[.\w\-/]*\/(?=\.env)/);
  outPath = outPath ? `${outPath}/` : '';

  const mappedTypes = variables.map((v) => {
    return `${v}${shouldOutputOptionalTypes ? '?' : ''}: string;`;
  });

  const typeDeclaration = printTypes(indentationSize, mappedTypes);

  writeFileSync(`${cwd}/${outPath}env.d.ts`, typeDeclaration);

  return Buffer.from(typeDeclaration);
};
