import { readFileSync, unlinkSync } from 'fs';
import process from 'process';
import { generate } from '../generate';

describe('.env type declaration generator', () => {
  let originalFile;
  const cwd = `${process.cwd()}/__test__`;

  beforeAll(() => {
    originalFile = readFileSync('__test__/env.d.ts');
  });

  afterAll(() => {
    unlinkSync('__test__/example-dir/env.d.ts');
  });

  it('should output the expected file', () => {
    const buffer = generate(cwd, '.env');

    expect(buffer).toEqual(originalFile);
  });

  it('should output the expected file for relative paths', () => {
    const buffer = generate(cwd, './.env');

    expect(buffer).toEqual(originalFile);
  });

  it('should output the expected file for .env files in subdirectories', () => {
    const buffer = generate(cwd, './example-dir/.env');

    expect(buffer).toEqual(originalFile);
  });

  describe('edge case tests', () => {
    let mockExit;
    beforeAll(() => {
      mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    });

    afterAll(() => {
      mockExit.mockRestore();
    });

    it('should fail for valid paths', () => {
      expect(() => {
        generate(cwd, 'example-dir.env');
      }).toThrow();

      expect(mockExit).toHaveBeenCalled();
    });

    it('should fail for empty .env files', () => {
      expect(() => {
        generate(cwd, './.env.empty');
      }).toThrow();
    });
  });
});
