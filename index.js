#!/usr/bin/env node
import { options } from 'yargs';
import { readFileSync, writeFileSync } from 'fs';

const { argv } = options({
  file: { type: 'string', default: '.env', alias: 'f' },
  version: { alias: 'v' },
})
  .help()
  .alias('help', 'h');

let file;
try {
  file = readFileSync(argv.file);
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

const path = argv.file.match(/[.\w\-/]+(?=\.env)/) ?? '.';
const mappedTypes = variables.map((v, i, arr) => {
  if (i === arr.length - 1) return `${v}: string;`;
  return `${v}: string;\n`;
});

writeFileSync(
  `${path}/env.d.ts`,
  `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ${mappedTypes.join('      ')}
    }
  }
}

export {}
`
);
