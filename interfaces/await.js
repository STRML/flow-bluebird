import Bluebird from 'util/bluebird';

declare module 'bluebird' {
  declare class exports<T> extends Bluebird { }
}

declare var Promise: $Exports<'bluebird'>;

// Fix async/await for Bluebird
declare function $await<T>(p: Promise<T> | T): T;

