# flow-bluebird

Attempting to override builtin Promise with Bluebird and make async/await work.

[Was not successful](https://github.com/facebook/flow/issues/1171) with the `declare` syntax, so I'm
redirecting requires to a `util/bluebird.js` module that defines the class' interface.

Output is:

```
$ flow
test.js:6
  6:   let output = await doubleAsync(a);
                    ^^^^^^^^^^^^^^^^^^^^ await
  7:   return output / 2;
              ^^^^^^ Promise. This type is incompatible with
  7:   return output / 2;
              ^^^^^^^^^^ number

test.js:17
 17:   return result[0] / 2;
              ^^^^^^^^^ access of computed property/element. Indexable signature not found in
 17:   return result[0] / 2;
              ^^^^^^ Promise

test.js:21
 21:   return await Promise.doesntExist(doubleAsync(a));
                      ^^^^^^^^^^^ property `doesntExist`. Property not found in
704: export default Promise;
                    ^^^^^^^ statics of Promise. See: util/bluebird.js:704


Found 3 errors
```

Would expect no errors on line 6 and 17, error on 21 is expected and indicative that the bluebird
definition is being properly read.
