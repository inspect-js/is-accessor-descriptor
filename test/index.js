'use strict';

require('mocha');
var assert = require('assert');
var should = require('should');
var isDescriptor = require('../');
var noop = function(){};

describe('isDescriptor', function () {
  describe('value type', function () {
    it('should be false when not an object:', function () {
      assert(!isDescriptor('a'));
      assert(!isDescriptor(null));
      assert(!isDescriptor([]));
    });
  });

  describe('accessor descriptor:', function () {
    it('should be false when the object has data descriptor properties:', function () {
      assert(!isDescriptor({get: noop, writable: true}));
      assert(!isDescriptor({get: noop, value: true}));
    });

    it('should not be false when unrecognized properties are defined:', function () {
      assert(isDescriptor({get: noop, foo: true}));
      assert(isDescriptor({get: noop, bar: true}));
    });

    it('should be false when a get or set are not functions:', function () {
      assert(!isDescriptor({get: noop, set: 'baz'}));
      assert(!isDescriptor({get: 'foo', set: noop}));
      assert(!isDescriptor({get: 'foo', bar: 'baz'}));
      assert(!isDescriptor({get: 'foo', set: 'baz'}));
      assert(!isDescriptor({get: 'foo'}));
    });

    it('should be false when "get" is not defined:', function () {
      assert(!isDescriptor({set: noop}));
    });

    it('should be true when the object has valid properties:', function () {
      assert(isDescriptor({get: noop, set: noop}));
      assert(isDescriptor({get: noop}));
    });

    it('should be false when a value is not the correct type:', function () {
      assert(!isDescriptor({get: noop, set: noop, enumerable: 'foo'}));
      assert(!isDescriptor({set: noop, configurable: 'foo'}));
      assert(!isDescriptor({get: noop, configurable: 'foo'}));
    });
  });
});
