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
const isAccessor = require('is-accessor-descriptor');
const obj = {
	get foo() {},
	bar: {get: function() {}}
};

isAccessor(obj, 'foo'); //=> true
isAccessor(obj, 'bar'); //=> false

// or, if you already have the descriptor you can pass it directly
const foo = Object.getOwnPropertyDescriptor(obj, 'foo');
isAccessor(foo); //=> true

const bar = Object.getOwnPropertyDescriptor(obj, 'bar');
isAccessor(bar); //=> false
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
| 29 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2 | [realityking](https://github.com/realityking) |

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).