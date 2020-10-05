import { printTypes } from '../src/type-printer';

describe('type-printer tests', () => {
	it('should create correct indentation: size 2', () => {
		const data = ["VARIABLE1: string;", "VARIABLE2: string;"];
		
		const expected = 	'declare global {\n' +
							'  namespace NodeJS {\n' +
							'    interface ProcessEnv {\n' +
							'      VARIABLE1: string;\n' +
							'      VARIABLE2: string;\n' +
							'    }\n' +
							'  }\n' +
							'}\n' +
							'\n' +
							'export {};\n';

		const output = printTypes(2, data);		
		expect(output).toEqual(expected);
	});

	it('should create correct indentation: size 4', () => {
		const data = ["VARIABLE1: string;", "VARIABLE2: string;"];
		
		const expected = 	'declare global {\n' +
							'    namespace NodeJS {\n' +
							'        interface ProcessEnv {\n' +
							'            VARIABLE1: string;\n' +
							'            VARIABLE2: string;\n' +
							'        }\n' +
							'    }\n' +
							'}\n' +
							'\n' +
							'export {};\n';

		const output = printTypes(4, data);		
		expect(output).toEqual(expected);
	});
});