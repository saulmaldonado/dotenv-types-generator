import { printTypes } from '../src/printTypes';

const expectedSize2 = `declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VARIABLE1: string;
      VARIABLE2: string;
    }
  }
}

export {};
`;

const expectedSize4 = `declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VARIABLE1: string;
            VARIABLE2: string;
        }
    }
}

export {};
`;

describe('printTypes tests', () => {
  it('should create correct indentation: size 2', () => {
    const data = ['VARIABLE1: string', 'VARIABLE2: string'];

    const output = printTypes(2, data);
    expect(output).toEqual(expectedSize2);
  });

  it('should create correct indentation: size 4', () => {
    const data = ['VARIABLE1: string', 'VARIABLE2: string'];

    const output = printTypes(4, data);
    expect(output).toEqual(expectedSize4);
  });
});
