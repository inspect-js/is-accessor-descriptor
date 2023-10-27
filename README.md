# is-accessor-descriptor <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

<<<<<<< .merge_file_oXHkzP
[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
=======
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
>>>>>>> .merge_file_OTGJy6

[![npm badge][npm-badge-png]][package-url]

<<<<<<< .merge_file_oXHkzP
> Returns true if a value has the characteristics of a valid JavaScript accessor descriptor.

## Examples

```js
const isAccessorDescriptor = require('is-accessor-descriptor');
const assert = require('assert');

const obj = {
	get foo() {},
	bar: { get: function() {} }
};

assert.equal(true, isAccessorDescriptor(obj, 'foo'));
assert.equal(false, isAccessorDescriptor(obj, 'bar'));

// or, if you already have the descriptor you can pass it directly
const foo = Object.getOwnPropertyDescriptor(obj, 'foo');
assert.equal(true, isAccessorDescriptor(foo));

const bar = Object.getOwnPropertyDescriptor(obj, 'bar');
assert.equal(false, isAccessorDescriptor(bar));
```

### Related projects

You might also be interested in these projects:

* [is-data-descriptor](https://www.npmjs.com/package/is-data-descriptor): Returns true if a value has the characteristics of a valid JavaScript data descriptor.
* [is-descriptor](https://www.npmjs.com/package/is-descriptor): Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for… [more](https://github.com/inspect-js/is-descriptor)
* [is-object](https://www.npmjs.com/package/is-object): Returns true if the value is an object and not an array or null.

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/is-accessor-descriptor
[npm-version-svg]: https://versionbadg.es/inspect-js/is-accessor-descriptor.svg
[deps-svg]: https://david-dm.org/inspect-js/is-accessor-descriptor.svg
[deps-url]: https://david-dm.org/inspect-js/is-accessor-descriptor
[dev-deps-svg]: https://david-dm.org/inspect-js/is-accessor-descriptor/dev-status.svg
[dev-deps-url]: https://david-dm.org/inspect-js/is-accessor-descriptor#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/is-accessor-descriptor.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/is-accessor-descriptor.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/is-accessor-descriptor.svg
[downloads-url]: https://npm-stat.com/charts.html?package=is-accessor-descriptor
[codecov-image]: https://codecov.io/gh/inspect-js/is-accessor-descriptor/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/inspect-js/is-accessor-descriptor/
[actions-image]: https://img.shields.io/endpoint?url=https://github-actions-badge-u3jn4tfpocch.runkit.sh/inspect-js/is-accessor-descriptor
[actions-url]: https://github.com/inspect-js/is-accessor-descriptor/actions
=======
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
>>>>>>> .merge_file_OTGJy6
