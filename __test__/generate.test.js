import { unlinkSync, writeFileSync, mkdirSync, rmdirSync } from 'fs';
import process from 'process';
import { generate } from '../src/generate';

const snapshotFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_KEY2: string;
    }
  }
}

export {};
`;

const optionalTypesFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY?: string;
      API_KEY2?: string;
    }
  }
}

export {};
`;

const exampleEnv = `API_KEY=123456789
API_KEY2=987654321`;

describe('.env type declaration generator', () => {
  let originalFile;
  const cwd = `${process.cwd()}/__test__`;

  // creates a new file containing the expected contents
  beforeAll(() => {
    originalFile = Buffer.from(snapshotFile);
    writeFileSync('__test__/.env', exampleEnv);
    writeFileSync('__test__/.env.empty', '');
    mkdirSync('__test__/example-dir');
    writeFileSync('__test__/example-dir/.env', exampleEnv, '');
  });

  afterAll(() => {
    unlinkSync('__test__/env.d.ts');
    unlinkSync('__test__/.env');
    unlinkSync('__test__/.env.empty');
    rmdirSync('__test__/example-dir', { recursive: true });
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

  it('should output the expected file with optional types', () => {
    const optionalFile = Buffer.from(optionalTypesFile);
    const buffer = generate(cwd, '.env', true);
    expect(buffer).toEqual(optionalFile);
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
