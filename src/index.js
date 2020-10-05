#!/usr/bin/env node
import { options } from 'yargs';
import { cwd } from 'process';
import { generate } from './generate';

const { argv } = options({
  file: { type: 'string', default: '.env', alias: 'f' },
  version: { alias: 'v' },
  optionalTypes: {
    type: 'boolean',
    default: false,
    alias: 'o',
    description: 'Makes all types optional (nullable)',
  },
  indentationSize: {
    type: 'number',
    default: 2,
    alias: 'i',
    description: 'Defines how the template should be indented',
  },
})
  .help()
  .alias('help', 'h');

generate(cwd(), argv.file, argv.optionalTypes, argv.indentationSize);
