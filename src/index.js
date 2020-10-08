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
  mergeTypes: {
    type: 'boolean',
    default: false,
    alias: 'm',
    description:
      'Merges existing types from env.d.ts file with the types from .env file',
  },
  defaults: {
    type: 'array',
    alias: 'd',
    description: 'Adds default process.env properties to template',
  },
})
  .help()
  .alias('help', 'h');

generate(
  cwd(),
  argv.file,
  argv.optionalTypes,
  argv.indentationSize,
  argv.mergeTypes,
  argv.defaults
);
