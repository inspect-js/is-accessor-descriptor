# is-accessor-descriptor [![NPM version](https://img.shields.io/npm/v/is-accessor-descriptor.svg?style=flat)](https://www.npmjs.com/package/is-accessor-descriptor) [![NPM monthly downloads](https://img.shields.io/npm/dm/is-accessor-descriptor.svg?style=flat)](https://npmjs.org/package/is-accessor-descriptor) [![NPM total downloads](https://img.shields.io/npm/dt/is-accessor-descriptor.svg?style=flat)](https://npmjs.org/package/is-accessor-descriptor) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/is-accessor-descriptor.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/is-accessor-descriptor)

> Returns true if a value has the characteristics of a valid JavaScript accessor descriptor.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save is-accessor-descriptor
```

## Usage

```js
var isAccessor = require('is-accessor-descriptor');

isAccessor({get: function() {}});
//=> true
```

You may also pass an object and property name to check if the property is an accessor:

```js
isAccessor(foo, 'bar');
```

## Examples

`false` when not an object

```js
isAccessor('a')
isAccessor(null)
isAccessor([])
//=> false
```

`true` when the object has valid properties

and the properties all have the correct JavaScript types:

```js
isAccessor({get: noop, set: noop})
isAccessor({get: noop})
isAccessor({set: noop})
//=> true
```

`false` when the object has invalid properties

```js
isAccessor({get: noop, set: noop, bar: 'baz'})
isAccessor({get: noop, writable: true})
isAccessor({get: noop, value: true})
//=> false
```

`false` when an accessor is not a function

```js
isAccessor({get: noop, set: 'baz'})
isAccessor({get: 'foo', set: noop})
isAccessor({get: 'foo', bar: 'baz'})
isAccessor({get: 'foo', set: 'baz'})
//=> false
```

`false` when a value is not the correct type

```js
isAccessor({get: noop, set: noop, enumerable: 'foo'})
isAccessor({set: noop, configurable: 'foo'})
isAccessor({get: noop, configurable: 'foo'})
//=> false
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

### Related projects

You might also be interested in these projects:

* [is-accessor-descriptor](https://www.npmjs.com/package/is-accessor-descriptor): Returns true if a value has the characteristics of a valid JavaScript accessor descriptor. | [homepage](https://github.com/jonschlinkert/is-accessor-descriptor "Returns true if a value has the characteristics of a valid JavaScript accessor descriptor.")
* [is-data-descriptor](https://www.npmjs.com/package/is-data-descriptor): Returns true if a value has the characteristics of a valid JavaScript data descriptor. | [homepage](https://github.com/jonschlinkert/is-data-descriptor "Returns true if a value has the characteristics of a valid JavaScript data descriptor.")
* [is-descriptor](https://www.npmjs.com/package/is-descriptor): Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for… [more](https://github.com/jonschlinkert/is-descriptor) | [homepage](https://github.com/jonschlinkert/is-descriptor "Returns true if a value has the characteristics of a valid JavaScript descriptor. Works for data descriptors and accessor descriptors.")
* [is-plain-object](https://www.npmjs.com/package/is-plain-object): Returns true if an object was created by the `Object` constructor. | [homepage](https://github.com/jonschlinkert/is-plain-object "Returns true if an object was created by the `Object` constructor.")
* [isobject](https://www.npmjs.com/package/isobject): Returns true if the value is an object and not an array or null. | [homepage](https://github.com/jonschlinkert/isobject "Returns true if the value is an object and not an array or null.")

### Contributors

| **Commits** | **Contributor** |
| --- | --- |
| 22 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2 | [realityking](https://github.com/realityking) |

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).
