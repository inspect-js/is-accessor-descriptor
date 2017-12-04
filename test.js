'use strict';

require('mocha');
var assert = require('assert');
var isAccessor = require('./');
var noop = function() {};

describe('isAccessor', function() {
  it('should be false when not an object', function() {
    assert(!isAccessor('a'));
    assert(!isAccessor(null));
    assert(!isAccessor([]));
  });

  it('should be false when the property has data descriptor properties', function() {
    var obj = {
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

  it('should be true when the property is a valid getter/setter', function() {
    const obj = {get foo() {}};
    assert(isAccessor(obj, 'foo'));
    assert(isAccessor(Object.getOwnPropertyDescriptor(obj, 'foo')));
  });

  it('should check ctor.prototype', function() {
    class Foo {
      get bar() {
        return 'baz';
      }
    }
    var obj = new Foo();
    assert(isAccessor(obj, 'bar'));
  });

  it('should not check ctor.prototype when disabled', function() {
    class Foo {
      get bar() {
        return 'baz';
      }
    }
    var obj = new Foo();
    assert(!isAccessor(obj, 'bar', false));
  });

  it('should be false when get or set are not functions', function() {
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

  it('should be false when the object lacks necessary properties', function() {
    assert(!isAccessor({ set: noop }));
    assert(!isAccessor({ get: noop, set: noop }));
    assert(!isAccessor({ get: noop }));
  });

  it('should be false when invalid properties are defined', function() {
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
      bar: true,
    }));
  });

  it('should be false when a value is not the correct type', function() {
    assert(!isAccessor({ get: noop, set: noop, enumerable: 'foo' }));
    assert(!isAccessor({ set: noop, configurable: 'foo' }));
    assert(!isAccessor({ get: noop, configurable: 'foo' }));
  });
});
