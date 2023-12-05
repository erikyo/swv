import { expect, describe, it } from 'vitest';
import { date } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('date validation', () => {
	it('passes when all values are valid date strings', () => {
		const formDataTree = createMockFormData([
			{ name: 'dateField', value: '1990-01-01' },
		]);

		const context = { field: 'dateField' };

		expect(date.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not a valid date string', () => {
		const formDataTree = createMockFormData([
			{ name: 'date', value: 'invalid-date' },
		]);

		const context = { field: 'date' };

		expect(date.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the date format is not YYYY-MM-DD', () => {
		const formDataTree = createMockFormData([
			{ name: 'date', value: '2023/02/28' },
		]);

		const context = { field: 'date' };

		expect(date.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the date format is correct', () => {
		const formDataTree = createMockFormData([
			{ name: 'date', value: '2023-02-50' },
		]);

		const context = { field: 'date' };

		expect(date.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
