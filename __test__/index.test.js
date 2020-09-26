import { readFileSync } from 'fs';
import process from 'process';
import { generate } from '../generate';

describe('.env type declaration generator', () => {
  let originalFile;

  beforeAll(() => {
    originalFile = readFileSync('__test__/env.d.ts');
  });

  it('should output the expected file', () => {
    const buffer = generate(`${process.cwd()}/__test__`, '.env');

    expect(buffer).toEqual(originalFile);
  });
});
