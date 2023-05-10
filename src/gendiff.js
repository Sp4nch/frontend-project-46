import { cwd } from 'node:process';
import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';

export default (path1, path2) => {
  const fileOne = readFileSync(path.resolve(cwd(), path1), 'utf-8').trim();
  const fileTwo = readFileSync(path.resolve(cwd(), path2), 'utf-8').trim();

  const objOne = JSON.parse(fileOne);
  const objTwo = JSON.parse(fileTwo);

  const keysOne = Object.keys(objOne);
  const keysTwo = Object.keys(objTwo);

  const commonKeys = _.uniq([...keysOne, ...keysTwo]);
  const sortKeys = commonKeys.sort() 
  const diffStr = sortKeys.flatMap((key) => {
    if (!_.has(objOne, key)) {
      return `  + ${key}: ${objTwo[key]}`;
    };
    if (!_.has(objTwo, key)) {
      return `  - ${key}: ${objOne[key]}`;
    };
    if (_.isEqual(objOne[key], objTwo[key])) {
      return `    ${key}: ${objOne[key]}`;
    };
    if (!_.isEqual(objOne[key], objTwo[key])) {
      return [`  - ${key}: ${objOne[key]}`, `  + ${key}: ${objTwo[key]}`];
    };
  }).join('\n');
  return `{\n${diffStr}\n}`
};
