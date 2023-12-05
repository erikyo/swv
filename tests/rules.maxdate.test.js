import { expect, describe, it } from 'vitest';
import { maxdate } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('maxdate validation', () => {
	it('passes when all dates are less than the maximum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '2023-01-01' },
			{ name: 'dateField', value: '2023-02-01' },
		]);

		const context = { field: 'dateField', threshold: '2023-03-01' };

		expect(maxdate.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one date is greater than the maximum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '2023-01-01' },
			{ name: 'dateField', value: '2023-03-01' },
		]);

		const context = { field: 'dateField', threshold: '2023-02-01' };

		expect(maxdate.bind(context, formDataTree)).toThrow(ValidationError);
	});

/*	it('throws when the date format is invalid', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: 'invalid-date' },
		]);

		const context = { field: 'dateField', threshold: '2023-03-01' };

		expect(maxdate.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the threshold date format is invalid', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '2023-01-01' },
		]);

		const context = { field: 'dateField', threshold: 'invalid-date' };

		expect(maxdate.bind(context, formDataTree)).toThrow(ValidationError);
	});*/

	it('passes when no dates are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'dateField', threshold: '2023-03-01' };

		expect(maxdate.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
