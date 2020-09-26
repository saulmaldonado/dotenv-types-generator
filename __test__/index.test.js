import { readFileSync, unlinkSync, copyFileSync } from 'fs';
import childProcess from 'child_process';

describe('command line tool', () => {
  let originalFile;

  beforeAll(() => {
    originalFile = readFileSync('__test__/env.d.ts');
    copyFileSync('__test__/.env', '.env');
  });

  afterAll(() => {
    unlinkSync('env.d.ts');
    unlinkSync('.env');
  });

  it('should generate env.d.ts', () => {
    childProcess.execSync('dotenv-types-generator');
    const buffer = readFileSync('./env.d.ts');
    expect(buffer).toEqual(originalFile);
  });

  it('should generate env.d.ts in sub-directory', () => {
    childProcess.execSync(
      'dotenv-types-generator -f __test__/example-dir/.env'
    );
    const buffer = readFileSync('./__test__/example-dir/env.d.ts');
    expect(buffer).toEqual(originalFile);
  });
});
