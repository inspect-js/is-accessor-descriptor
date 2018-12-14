'use strict';

require('mocha');
const assert = require('assert');
const isAccessor = require('./');
const noop = () => {};

describe('isAccessor', () => {
  it('should be false when not an object', () => {
    assert(!isAccessor('a'));
    assert(!isAccessor(null));
    assert(!isAccessor([]));
  });

  it('should be false when the property has data descriptor properties', () => {
    let obj = {
      foo: {
        writable: true,
        enumerable: true,
        configurable: true,
        get: noop,
        set: noop
      }
    };
    assert(!isAccessor(obj, 'foo'));
  });

  it('should be true when the property is a valid getter/setter', () => {
    const obj = { foo() {}, set bar(value) {}, get bar() {} };
    assert(isAccessor(obj, 'bar'));
    assert(isAccessor(Object.getOwnPropertyDescriptor(obj, 'bar')));
  });

  it('should check ctor.prototype', () => {
    class Foo {
      get bar() {
        return 'baz';
      }
    }
    let obj = new Foo();
    assert(isAccessor(obj, 'bar'));
  });

  it('should not check ctor.prototype when disabled', () => {
    class Foo {
      get bar() {
        return 'baz';
      }
    }
    let obj = new Foo();
    assert(!isAccessor(obj, 'bar', false));
  });

  it('should be false when get or set are not functions', () => {
    assert(!isAccessor({
      configurable: true,
      enumerable: true,
      set: 'baz',
      get: noop
    }));

    assert(!isAccessor({
      configurable: true,
      enumerable: true,
      set: noop,
      get: 'foo'
    }));

    assert(!isAccessor({
      configurable: true,
      enumerable: true,
      bar: 'baz',
      get: 'foo'
    }));

    assert(!isAccessor({
      configurable: true,
      enumerable: true,
      set: 'baz',
      get: 'foo'
    }));

    assert(!isAccessor({
      get: 'foo',
      enumerable: true,
      configurable: true
    }));
  });

  it('should be false when the object lacks necessary properties', () => {
    assert(!isAccessor({ set: noop }));
    assert(!isAccessor({ get: noop, set: noop }));
    assert(!isAccessor({ get: noop }));
  });

  it('should be false when invalid properties are defined', () => {
    assert(!isAccessor({
      enumerable: true,
      configurable: true,
      get: noop,
      foo: true
    }));

    assert(!isAccessor({
      enumerable: true,
      configurable: true,
      get: noop,
      bar: true
    }));
  });

  it('should be false when a value is not the correct type', () => {
    assert(!isAccessor({ get: noop, set: noop, enumerable: 'foo' }));
    assert(!isAccessor({ set: noop, configurable: 'foo' }));
    assert(!isAccessor({ get: noop, configurable: 'foo' }));
  });
});
