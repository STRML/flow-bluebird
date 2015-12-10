# flow-bluebird

Attempting to override builtin Promise with Bluebird and make async/await work.

This appears to work, but I'm unuse of the ramifications of redefining $await from:

```js
declare function $await<T>(p: Promise<T> | T): T;
```

to

```js
declare function $await<T>(p: Promise<T>): T;
```

With the union type, it appears Flow is not unwrapping the promise.

Output is:

```
$ flow
test.js:7
  7:   return output.trim(); // This should error!
                     ^^^^ property `trim`. Property not found in
  7:   return output.trim(); // This should error!
              ^^^^^^ Number

test.js:21
 21:   return await Promise.doesntExist(doubleAsync(a));
                            ^^^^^^^^^^^ property `doesntExist`. Property not found in
 85: declare class Promise<R> {
     ^ statics of Promise. See: interfaces/await.js:85

test.js:31
 31:   console.log(await testThen(1) + false);
                                       ^^^^^ boolean. This type is incompatible with
 31:   console.log(await testThen(1) + false);
                   ^^^^^^^^^^^^^^^^^^^^^^^^^ string


Found 3 errors
```

This typechecks as expected.
