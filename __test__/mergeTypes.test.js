import { writeFileSync, mkdirSync, rmdirSync } from 'fs';
import { randomBytes } from 'crypto';
import { mergeTypes } from '../src/mergeTypes';

const exampleEnvFile = `declare global {
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

const exampleMappedTypes = [
  'API_KEY: string',
  'API_KEY2: string',
  'PWD: string',
  'NODE_ENV: string',
];

const exampleMergedTypes = [
  'PWD: string',
  'EDITOR: string',
  'HOME: string',
  'NODE_ENV?: string',
  'API_KEY: string',
  'API_KEY2: string',
];

describe('mergeTypes tests', () => {
  let randomDirName;

  beforeAll(() => {
    /**
     * Creates a random test directory name to prevent collisions
     */
    randomDirName = randomBytes(16).toString('hex');
    mkdirSync(randomDirName);
    writeFileSync(`${randomDirName}/env.d.ts`, exampleEnvFile);
  });

  afterAll(() => {
    rmdirSync(randomDirName, { recursive: true });
  });

  it('should return mapped types when path does not exist', () => {
    const result = mergeTypes(exampleMappedTypes, '');
    expect(result).toEqual(exampleMappedTypes);
  });

  it('should return mapped types when env.d.ts file is invalid', () => {
    writeFileSync(`${randomDirName}/env.d.ts`, 'invalid-file');
    const result = mergeTypes(exampleMappedTypes, `${randomDirName}/env.d.ts`);
    writeFileSync(`${randomDirName}/env.d.ts`, exampleEnvFile);
    expect(result).toEqual(exampleMappedTypes);
  });

  it('should merge types', () => {
    const result = mergeTypes(exampleMappedTypes, `${randomDirName}/env.d.ts`);

    expect(result).toEqual(exampleMergedTypes);
  });
});
