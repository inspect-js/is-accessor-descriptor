'use strict';

var test = require('tape');
var hasPropertyDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');
var isAccessorDescriptor = require('../');
var noop = function () {};

test('isAccessorDescriptor', function (t) {
	t.test('value type: is false when not an object', function (st) {
		st.notOk(isAccessorDescriptor('a'));
		st.notOk(isAccessorDescriptor(null));
		st.notOk(isAccessorDescriptor([]));

		st.end();
	});

	t.notOk(
		isAccessorDescriptor({
			foo: {
				writable: true,
				enumerable: true,
				configurable: true,
				get: noop,
				set: noop
			}
		}, 'foo'),
		'is false when the property has data descriptor properties'
	);

	t.test('should be true when the property is a valid getter/setter', { skip: !hasPropertyDescriptors }, function (st) {
		var obj = {
			foo: function () {}
		};
		Object.defineProperty(obj, 'bar', {
			get: function bar() {},
			set: function bar(value) {} // eslint-disable-line no-unused-vars
		});

		st.ok(isAccessorDescriptor(obj, 'bar'));
		st.ok(isAccessorDescriptor(gOPD(obj, 'bar')));

		st.end();
	});

	t.test('constructor.prototype:', { skip: !hasPropertyDescriptors }, function (st) {
		var Foo = function Foo() {}; // eslint-disable-line func-name-matching
		Object.defineProperty(Foo.prototype, 'bar', {
			get: function bar() {
				return 'baz';
			}
		});

		st.ok(isAccessorDescriptor(new Foo(), 'bar'), 'checks ctor.prototype');
		st.notOk(isAccessorDescriptor(new Foo(), 'bar', false), 'does not check ctor.prototype when disabled');

		st.end();
	});

	t.test('is false when get or set are not functions', function (st) {
		st.notOk(isAccessorDescriptor({
			configurable: true,
			enumerable: true,
			set: 'baz',
			get: noop
		}));

		st.notOk(isAccessorDescriptor({
			configurable: true,
			enumerable: true,
			set: noop,
			get: 'foo'
		}));

		st.notOk(isAccessorDescriptor({
			configurable: true,
			enumerable: true,
			bar: 'baz',
			get: 'foo'
		}));

		st.notOk(isAccessorDescriptor({
			configurable: true,
			enumerable: true,
			set: 'baz',
			get: 'foo'
		}));

		st.notOk(isAccessorDescriptor({
			get: 'foo',
			enumerable: true,
			configurable: true
		}));

		st.end();
	});

	t.test('is false when the object lacks necessary properties', function (st) {
		st.notOk(isAccessorDescriptor({ set: noop }));
		st.notOk(isAccessorDescriptor({ get: noop, set: noop }));
		st.notOk(isAccessorDescriptor({ get: noop }));

		st.end();
	});

	t.test('is true for a partial accessor descriptor with an accessor and one of enumerable/configurable', function (st) {
		st.ok(isAccessorDescriptor({ get: noop, enumerable: true }), 'get + enumerable');
		st.ok(isAccessorDescriptor({ get: noop, configurable: true }), 'get + configurable');
		st.ok(isAccessorDescriptor({ set: noop, enumerable: true }), 'set + enumerable');
		st.ok(isAccessorDescriptor({ set: noop, configurable: true }), 'set + configurable');
		st.ok(isAccessorDescriptor({ get: noop, set: noop, enumerable: true }), 'get + set + enumerable');
		st.ok(isAccessorDescriptor({ get: noop, set: noop, configurable: true }), 'get + set + configurable');

		st.end();
	});

	t.test('is false when invalid properties are defined', function (st) {
		st.notOk(isAccessorDescriptor({
			enumerable: true,
			configurable: true,
			get: noop,
			foo: true
		}));

		st.notOk(isAccessorDescriptor({
			enumerable: true,
			configurable: true,
			get: noop,
			bar: true
		}));

		st.notOk(isAccessorDescriptor({
			enumerable: true,
			configurable: true,
			get: noop,
			set: noop,
			extra: true
		}), 'is false when a complete descriptor has an extra property');

		st.end();
	});

	t.test('is false when a value is not the correct type', function (st) {
		st.notOk(isAccessorDescriptor({ get: noop, set: noop, enumerable: 'foo' }));
		st.notOk(isAccessorDescriptor({ set: noop, configurable: 'foo' }));
		st.notOk(isAccessorDescriptor({ get: noop, configurable: 'foo' }));

		st.notOk(isAccessorDescriptor({
			get: noop,
			set: noop,
			enumerable: 'foo',
			configurable: true
		}), 'is false when enumerable is not a boolean in a complete descriptor');

		st.notOk(isAccessorDescriptor({
			get: noop,
			set: noop,
			enumerable: true,
			configurable: 'bar'
		}), 'is false when configurable is not a boolean in a complete descriptor');

		st.end();
	});

	t.test('ignores inherited enumerable properties on descriptor objects', function (st) {
		var proto = { inherited: true };
		var desc = Object.create(proto);
		desc.get = noop;
		desc.set = noop;
		desc.enumerable = true;
		desc.configurable = true;

		st.ok(isAccessorDescriptor(desc), 'is true when extra properties are only inherited');

		st.end();
	});

	t.test('with a key', { skip: !hasPropertyDescriptors }, function (st) {
		var desc = { enumerable: true, get: function () {} };

		st.equal(isAccessorDescriptor(Object.defineProperty({}, 'foo', desc), 'foo'), true, 'an accessor property is an accessor descriptor');
		st.equal(isAccessorDescriptor(Object.defineProperty({}, '', desc), ''), true, 'an empty string accessor property is an accessor descriptor');
		st.equal(isAccessorDescriptor(Object.defineProperty({}, 0, desc), 0), true, 'a zero accessor property is an accessor descriptor');

		st.end();
	});
});
