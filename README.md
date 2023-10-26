# is-accessor-descriptor [![NPM version](https://img.shields.io/npm/v/is-accessor-descriptor.svg)](https://www.npmjs.com/package/is-accessor-descriptor) [![Build Status](https://img.shields.io/travis/jonschlinkert/is-accessor-descriptor.svg)](https://travis-ci.org/jonschlinkert/is-accessor-descriptor)

> Returns true if a value has the characteristics of a valid JavaScript accessor descriptor.

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Related projects](#related-projects)
- [Running tests](#running-tests)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i is-accessor-descriptor --save
```

## Usage

```js
var isAccessor = require('is-accessor-descriptor');
var assert = require('assert');

assert.equal(isAccessor({ get() {} }), true);
```

You may also pass an object and property name to check if the property is an accessor:

```js
assert.equal(isAccessor({ bar: 'foo' }, 'bar'), false);
```

## Examples

`false` when not an object

```js
assert.equal(isAccessor('a'), false);
assert.equal(isAccessor(null), false);
```

`true` when the object has valid properties

and the properties all have the correct JavaScript types:

```js
assert.equal(isAccessor({ get() {}, set() {} }), true);
assert.equal(isAccessor({ get() {} }), true);
assert.equal(isAccessor({ set() {} }), true);
```

`false` when the object has invalid properties

```js
assert.equal(isAccessor({ get() {}, set() {}, enumerable: 'baz' }), false);
assert.equal(isAccessor({ get() {}, writable: true }), false);
assert.equal(isAccessor({ get() {}, value: true }), false);
//=> false
```

`false` when an accessor is not a function

```js
assert.equal(isAccessor({ get() {}, set: 'baz' }), false);
assert.equal(isAccessor({ get: 'foo', set() {} }), false);
assert.equal(isAccessor({ get: 'foo', bar: 'baz' }), false);
assert.equal(isAccessor({ get: 'foo', set: 'baz' }), false);
//=> false
```

`false` when a value is not the correct type

```js
assert.equal(isAccessor({ get() {}, set() {}, enumerable: 'foo' }), false);
assert.equal(isAccessor({ set() {}, configurable: 'foo' }), false);
assert.equal(isAccessor({ get() {}, configurable: 'foo' }), false);
//=> false
```

## Related projects

* [is-accessor-descriptor](https://www.npmjs.com/package/is-accessor-descriptor): Returns true if a value has the characteristics of a valid JavaScript accessor descriptor. | [homepage](https://github.com/jonschlinkert/is-accessor-descriptor)
* [is-data-descriptor](https://www.npmjs.com/package/is-data-descriptor): Returns true if a value has the characteristics of a valid JavaScript data descriptor. | [homepage](https://github.com/jonschlinkert/is-data-descriptor)
* [is-descriptor](https://www.npmjs.com/package/is-descriptor): Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for… [more](https://www.npmjs.com/package/is-descriptor) | [homepage](https://github.com/jonschlinkert/is-descriptor)
* [is-plain-object](https://www.npmjs.com/package/is-plain-object): Returns true if an object was created by the `Object` constructor. | [homepage](https://github.com/jonschlinkert/is-plain-object)
* [isobject](https://www.npmjs.com/package/isobject): Returns true if the value is an object and not an array or null. | [homepage](https://github.com/jonschlinkert/isobject)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/is-accessor-descriptor/issues/new).

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.
