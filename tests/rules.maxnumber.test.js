import { expect, describe, it } from 'vitest';
import { maxnumber } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('maxnumber validation', () => {
	it('passes when all values are less than or equal to the maximum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '5' },
			{ name: 'numberField', value: '10' },
		]);

		const context = { field: 'numberField', threshold: '20' };

		expect(maxnumber.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is greater than the maximum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '15' },
			{ name: 'numberField', value: '25' },
		]);

		const context = { field: 'numberField', threshold: '20' };

		expect(maxnumber.bind(context, formDataTree)).toThrow(ValidationError);
	});

/*	it('throws when a non-numeric value is present', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: 'asd' }, // Non-numeric value
		]);

		const context = { field: 'numberField', threshold: '10' };

		expect(maxnumber.bind(context, formDataTree)).toThrow(ValidationError);
	});*/

	it('passes when no values are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'numberField', threshold: '0' };

		expect(maxnumber.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
