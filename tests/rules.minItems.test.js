import { expect, describe, it } from 'vitest';
import { minitems } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('minitems validation', () => {
	it('passes when the number of values is greater than or equal to the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'field', value: 'value1' },
			{ name: 'field', value: 'value2' },
		]);

		const context = { field: 'field', threshold: '2' };

		expect(minitems.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when the number of values is less than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'field', value: 'value1' },
			{ name: 'field', value: 'value2' },
		]);

		const context = { field: 'field', threshold: '3' };

		expect(minitems.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when a non-array field is provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'field', value: 'singleValue' }, // Non-array value
		]);

		const context = { field: 'field', threshold: '2' };

		expect(minitems.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when no values are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'field', threshold: '0' };

		expect(minitems.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
