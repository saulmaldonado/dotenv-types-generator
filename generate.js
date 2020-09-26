import { readFileSync, writeFileSync } from 'fs';

export const generate = (cwd, path) => {
  let file;
  try {
    file = readFileSync(`${cwd}/${path}`);
  } catch {
    console.error('invalid path to .env file');
    process.exit(1);
  }

  const variables = file.toString().match(/(?<=\s*)\w+(?==)/gm);
  try {
    if (!variables.length) throw new Error();
  } catch {
    console.error('Empty .env file');
    process.exit(1);
  }

  let outPath = path.match(/[.\w\-/]*\/(?=\.env)/);
  outPath = outPath ? `${outPath}/` : '';
  const mappedTypes = variables.map((v, i, arr) => {
    if (i === arr.length - 1) return `${v}: string;`;
    return `${v}: string;\n`;
  });

  const typeDeclaration = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ${mappedTypes.join('      ')}
    }
  }
}
  
export {}
  `;

  writeFileSync(`${cwd}/${outPath}env.d.ts`, typeDeclaration);

  return Buffer.from(typeDeclaration);
};
