// @flow

import Promise from 'bluebird';

async function testThen(a: number): Promise<number> {
  let output = await doubleAsync(a);
  return output / 2;
}

async function testJoin(a: number): Promise<number>{
  let result = await Promise.join(
    doubleAsync(a),
    doubleAsync(a + 1),
    function(result1, result2) {
      return [result1, result2];
    });
  return result[0] / 2;
}

async function testNonExistent(a: number): Promise<void> {
  return await Promise.doesntExist(doubleAsync(a));
}

function doubleAsync(input: number): Promise<number> {
  return new Promise(function(resolve, reject) {
    resolve(input * 2);
  });
}

async function printResult() {
  console.log(await testThen(1));
  console.log(await testJoin(1));
}

printResult();
