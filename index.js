#!/usr/bin/env node
import { options } from 'yargs';
import { cwd } from 'process';
import { generate } from './generate';

const { argv } = options({
  file: { type: 'string', default: '.env', alias: 'f' },
  version: { alias: 'v' },
})
  .help()
  .alias('help', 'h');

generate(argv.file, cwd());
