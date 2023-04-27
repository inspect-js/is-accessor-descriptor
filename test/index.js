'use strict';

var test = require('tape');
var hasPropertyDescriptors = require('has-property-descriptors')();
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
		st.ok(isAccessorDescriptor(Object.getOwnPropertyDescriptor(obj, 'bar')));

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

		st.end();
	});

	t.test('is false when a value is not the correct type', function (st) {
		st.notOk(isAccessorDescriptor({ get: noop, set: noop, enumerable: 'foo' }));
		st.notOk(isAccessorDescriptor({ set: noop, configurable: 'foo' }));
		st.notOk(isAccessorDescriptor({ get: noop, configurable: 'foo' }));

		st.end();
	});
});
