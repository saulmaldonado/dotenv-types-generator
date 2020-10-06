import { readFileSync } from 'fs';

/**
 * Merges mapped types with already defined types from the given file
 * @param {Array} mappedTypes Mapped type definitions
 * @param {String} path The env.d.ts file to merge
 */
export const mergeTypes = (mappedTypes, path) => {
  let mergedArray;
  let file;

  try {
    file = readFileSync(path);
  } catch {
    return mappedTypes;
  }

  const fileContent = file.toString();
  const isValidFile = /(?<=ProcessEnv\s*\{)(.+?)(?=})/gs.test(fileContent);
  if (isValidFile) {
    const typeDefinitions = fileContent.match(/(?<=\s*)\w+\??: string/gim);

    const diff = mappedTypes.filter((item) => {
      // we split the item and strip ? character to check if it exists in the file
      const val = item.split(':')[0].replace('?', '');

      return typeDefinitions.findIndex((el) => el.includes(val)) === -1;
    });

    mergedArray = typeDefinitions.concat(diff);
  } else mergedArray = mappedTypes;

  return mergedArray;
};
