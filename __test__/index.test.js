import {
  readFileSync,
  unlinkSync,
  writeFileSync,
  mkdirSync,
  rmdirSync,
} from 'fs';
import childProcess from 'child_process';
import { randomBytes } from 'crypto';

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

const exampleEnv = `API_KEY=123456789
API_KEY2=987654321`;

describe('command line tool', () => {
  let originalFile;
  let randomDirName;

  beforeAll(() => {
    /**
     * Creates a random test directory name to prevent collisions
     */
    randomDirName = randomBytes(16).toString('hex');
    originalFile = Buffer.from(snapshotFile);

    writeFileSync('.env', exampleEnv);
    mkdirSync(randomDirName);
    writeFileSync(`${randomDirName}/.env`, exampleEnv);
  });

  afterAll(() => {
    unlinkSync('.env');
    rmdirSync(randomDirName, { recursive: true });
    unlinkSync('env.d.ts');
  });

  it('should generate env.d.ts', () => {
    childProcess.execSync('dotenv-types-generator');
    const buffer = readFileSync('./env.d.ts');

    expect(buffer).toEqual(originalFile);
  });

  it('should generate env.d.ts in sub-directory', () => {
    childProcess.execSync(`dotenv-types-generator -f ${randomDirName}/.env`);
    const buffer = readFileSync(`./${randomDirName}/env.d.ts`);

    expect(buffer).toEqual(originalFile);
  });

  it('should generate env.d.ts with optional types', () => {
    const optionalFile = Buffer.from(optionalTypesFile);
    childProcess.execSync(`dotenv-types-generator -o`);
    const buffer = readFileSync(`./env.d.ts`);

    expect(buffer).toEqual(optionalFile);
  });

  it('should generate env.d.ts with correct indentation: size 4', () => {
    const indentationFile = Buffer.from(expectedIndentationSize4);
    childProcess.execSync(`dotenv-types-generator -i 4`);
    const buffer = readFileSync(`./env.d.ts`);

    expect(buffer).toEqual(indentationFile);
  });

  it('should generate env.d.ts with merged types', () => {
    writeFileSync('./env.d.ts', existingTypesFile);
    const mergedFile = Buffer.from(expectedMergedFile);
    childProcess.execSync(`dotenv-types-generator -m`);
    const buffer = readFileSync(`./env.d.ts`);

    expect(buffer).toEqual(mergedFile);
  });

  it('should output the expected file with merged defaults', () => {
    const defaultsFile = Buffer.from(expectedDefaultsFile);
    childProcess.execSync(`dotenv-types-generator -d NODE_ENV BABEL_ENV DEBUG`);
    const buffer = readFileSync(`./env.d.ts`);

    expect(buffer).toEqual(defaultsFile);
  });

  it('should output the expected file with merged defaults without duplicates', () => {
    const defaultsWithoutDuplicatesFile = Buffer.from(
      expectedDefaultsWithoutDuplicatesFile
    );
    childProcess.execSync(`dotenv-types-generator -d API_KEY API_KEY2 DEBUG`);
    const buffer = readFileSync(`./env.d.ts`);

    expect(buffer).toEqual(defaultsWithoutDuplicatesFile);
  });
});
