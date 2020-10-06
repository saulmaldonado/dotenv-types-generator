const placeholderText = 'types-placeholder';
const template = [
  { indentation: 0, value: 'declare global {\n' },
  { indentation: 1, value: 'namespace NodeJS {\n' },
  { indentation: 2, value: 'interface ProcessEnv {\n' },
  { indentation: 3, value: placeholderText },
  { indentation: 2, value: '}\n' },
  { indentation: 1, value: '}\n' },
  { indentation: 0, value: '}\n' },
  { indentation: 0, value: '\n' },
  { indentation: 0, value: 'export {};\n' },
];

/**
 * Creates a type definition file template depending on the given indentation size.
 * @param {Number} indentationSize Defines how the template should be indented
 * @param {Array} mappedTypes Mapped type definitions
 */
export const printTypes = (indentationSize, mappedTypes) => {
  let output = '';
  const indentationText = ' '.repeat(indentationSize);

  template.forEach((element) => {
    const indentation = indentationText.repeat(element.indentation);

    if (element.value === placeholderText) {
      mappedTypes.forEach((mappedType) => {
        output += `${indentation}${mappedType};\n`;
      });
    } else output += `${indentation}${element.value}`;
  });

  return output;
};
