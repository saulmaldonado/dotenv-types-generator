import {
  readFileSync,
  unlinkSync,
  writeFileSync,
  mkdirSync,
  rmdirSync,
} from 'fs';
import childProcess from 'child_process';
import { randomBytes } from 'crypto';

const snapshotFile =
  'declare global {\n' +
  '  namespace NodeJS {\n' +
  '    interface ProcessEnv {\n' +
  '      API_KEY: string;\n' +
  '      API_KEY2: string;\n' +
  '    }\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'export {};\n';

const optionalTypesFile =
  'declare global {\n' +
  '  namespace NodeJS {\n' +
  '    interface ProcessEnv {\n' +
  '      API_KEY?: string;\n' +
  '      API_KEY2?: string;\n' +
  '    }\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'export {};\n';

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
});
