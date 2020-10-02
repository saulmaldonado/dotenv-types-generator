#!/usr/bin/env node
import { options } from 'yargs';
import { cwd } from 'process';
import { generate } from './generate';

const { argv } = options({
  file: { type: 'string', default: '.env', alias: 'f' },
  version: { alias: 'v' },
  optionalTypes: { type: 'boolean', default: false, alias: 'o', description: 'Makes all types optional (nullable)'}
})
  .help()
  .alias('help', 'h');

generate(cwd(), argv.file, argv.optionalTypes);
