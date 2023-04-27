/*
 *!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const hasOwn = function (obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};
const isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val);

module.exports = (obj, key, checkProto) => {
	if (!isObject(obj)) {
		return false;
	}

	let desc = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;
	if (key && !desc && checkProto !== false) {
		obj = obj.constructor.prototype;
		desc = Object.getOwnPropertyDescriptor(obj, key);
	}

	if (!isObject(desc)) {
		return false;
	}

	const check = (value) => {
		const validKeys = [
			'get',
			'set',
			'enumerable',
			'configurable',
		];

		for (const validKey of validKeys) {
			if (!hasOwn(desc, validKey)) {
				return false;
			}
		}

		for (const valueKey of Object.keys(value)) {
			if (!validKeys.includes(valueKey)) {
				return false;
			}
			const val = value[valueKey];

			if (valueKey === 'get' || valueKey === 'set') {
				if (val !== void 0 && typeof val !== 'function') {
					return false;
				}
				continue; // eslint-disable-line no-continue, no-restricted-syntax
			}

			if (typeof val !== 'boolean') {
				return false;
			}
		}
		return true;
	};

	if (check(desc) === true) {
		return true;
	}

	return false;
};
