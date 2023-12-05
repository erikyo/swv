import { expect, describe, it } from 'vitest';
import { mindate } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('mindate validation', () => {
	it('passes when all values are greater than or equal to the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '2023-01-15' },
			{ name: 'dateField', value: '2023-01-20' },
		]);

		const context = { field: 'dateField', threshold: '2023-01-10' };

		expect(mindate.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is less than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '2023-01-05' },
			{ name: 'dateField', value: '2023-01-15' },
		]);

		const context = { field: 'dateField', threshold: '2023-01-10' };

		expect(mindate.bind(context, formDataTree)).toThrow(ValidationError);
	});

/*	it('throws when the date format is invalid', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: 'invalid-date' },
		]);

		const context = { field: 'dateField', threshold: '2023-01-10' };

		expect(mindate.bind(context, formDataTree)).toThrow(ValidationError);
	});*/

	it('passes when no values are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'dateField', threshold: '2023-01-10' };

		expect(mindate.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
