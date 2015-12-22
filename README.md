# flow-bluebird

Attempting to override builtin Promise with Bluebird and make async/await work.

This test is with Flow 0.20.1.

In the `possibleSolution` branch, I define `$await` from:

```js
declare function $await<T>(p: Promise<T> | T): T;
```

to

```js
declare function $await<T>(p: Promise<T>): T;
```

With the union type, it appears Flow is not unwrapping the promise.

Now with v0.20.1, we have better error messages, so I thought I'd try it again with the original definition.

Output is:

```
$ flow
test.js:6
  6:   let output = await doubleAsync(a);
                          ^^^^^^^^^^^^^^ Promise. This type is incompatible with
703: declare function $await<T>(p: Promise<T> | T): T;
                                   ^^^^^^^^^^^^^^ union: type application of identifier `Promise` | type parameter `T` of await. See: interfaces/await.js:703

test.js:21
 21:   return await Promise.doesntExist(doubleAsync(a));
                            ^^^^^^^^^^^ property `doesntExist`. Property not found in
 85: declare class Promise<R> {
     ^ statics of Promise. See: interfaces/await.js:85

test.js:31
 31:   console.log(await testThen(1) + false);
                         ^^^^^^^^^^^ Promise. This type is incompatible with
703: declare function $await<T>(p: Promise<T> | T): T;
                                   ^^^^^^^^^^^^^^ union: type application of identifier `Promise` | type parameter `T` of await. See: interfaces/await.js:703


Found 3 errors

