import { unlinkSync, writeFileSync, mkdirSync, rmdirSync } from 'fs';
import process from 'process';
import { generate } from '../src/generate';

// Expected files
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

const expectedDefaultsFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_KEY2: string;
      NODE_ENV: string;
      BABEL_ENV: string;
      DEBUG: string;
    }
  }
}

export {};
`;

const expectedDefaultsWithoutDuplicatesFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      API_KEY2: string;
      DEBUG: string;
    }
  }
}

export {};
`;

const expectedIndentationSize4 = `declare global {
    namespace NodeJS {
        interface ProcessEnv {
            API_KEY: string;
            API_KEY2: string;
        }
    }
}

export {};
`;

const existingTypesFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PWD: string;
      EDITOR: string;
      HOME: string;
      NODE_ENV?: string;
    }
  }
}

export {};
`;

const expectedMergedFile = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PWD: string;
      EDITOR: string;
      HOME: string;
      NODE_ENV?: string;
      API_KEY: string;
      API_KEY2: string;
    }
  }
}

export {};
`;

const expectedBase64File = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIV_KEY: string;
      PUB_KEY: string;
    }
  }
}

export {};
`;

// Input files
const exampleEnv = `API_KEY=123456789
API_KEY2=987654321`;

const exampleBase64Env = `PRIV_KEY=aGVsbG93b3JsZA==
PUB_KEY=aGVsbG93b3JsZA==`;

describe('.env type declaration generator', () => {
  let originalFile;
  const cwd = `${process.cwd()}/__test__`;

  // creates a new file containing the expected contents
  beforeAll(() => {
    originalFile = Buffer.from(snapshotFile);
    writeFileSync('__test__/.env', exampleEnv);
    writeFileSync('__test__/.base64env', exampleBase64Env);
    writeFileSync('__test__/.env.empty', '');
    mkdirSync('__test__/example-dir');
    writeFileSync('__test__/example-dir/.env', exampleEnv, '');
  });

  afterAll(() => {
    unlinkSync('__test__/env.d.ts');
    unlinkSync('__test__/.env');
    unlinkSync('__test__/.env.empty');
    unlinkSync('__test__/.base64env');
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

  it('should output the expected file with correct indentation: size 4', () => {
    const indentationFile = Buffer.from(expectedIndentationSize4);
    const buffer = generate(cwd, '.env', false, 4);

    expect(buffer).toEqual(indentationFile);
  });

  it('should output the expected file with merged variables', () => {
    writeFileSync('__test__/env.d.ts', existingTypesFile);

    const mergedFile = Buffer.from(expectedMergedFile);
    const buffer = generate(cwd, '.env', false, 2, true);
    expect(buffer).toEqual(mergedFile);
  });

  it('should output the expected file with merged defaults', () => {
    const defaultsFile = Buffer.from(expectedDefaultsFile);
    const defaults = ['NODE_ENV', 'BABEL_ENV', 'DEBUG'];
    const buffer = generate(cwd, '.env', false, 2, false, defaults);

    expect(buffer).toEqual(defaultsFile);
  });

  it('should output the expected file with merged defaults without duplicates', () => {
    const defaultsWithoutDuplicatesFile = Buffer.from(
      expectedDefaultsWithoutDuplicatesFile
    );
    const defaults = ['API_KEY', 'API_KEY2', 'DEBUG'];
    const buffer = generate(cwd, '.env', false, 2, false, defaults);

    expect(buffer).toEqual(defaultsWithoutDuplicatesFile);
  });

  it('should output the expected file with base64 values', () => {
    const expectedBase64FileBuffer = Buffer.from(expectedBase64File);
    const buffer = generate(cwd, '.base64env');

    expect(buffer).toEqual(expectedBase64FileBuffer);
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
