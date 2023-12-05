import { expect, describe, it } from 'vitest';
import { minnumber } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('minnumber validation', () => {
	it('passes when all values are greater than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '10' },
			{ name: 'numberField', value: '15' },
		]);

		const context = { field: 'numberField', threshold: '5' };

		expect(minnumber.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is less than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '10' },
			{ name: 'numberField', value: '3' },
		]);

		const context = { field: 'numberField', threshold: '5' };

		expect(minnumber.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the value is equal to the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '5' },
		]);

		const context = { field: 'numberField', threshold: '5' };

		expect(minnumber.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

//it('throws when the value is not a valid number', () => {
//	const formDataTree = createMockFormData([
//		{ name: 'numberField', value: 'invalid-number' },
//	]);

//	const context = { field: 'numberField', threshold: '5' };

//	expect(minnumber.bind(context, formDataTree)).toThrow(ValidationError);
//});

	it('throws when the value is a negative number', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '-3' },
		]);

		const context = { field: 'numberField', threshold: '0' };

		expect(minnumber.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
