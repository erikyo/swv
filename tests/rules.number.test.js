import { expect, describe, it } from 'vitest';
import { number } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('number validation', () => {
	it('passes when all values are valid integers', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '123' },
			{ name: 'numberField', value: '-456' },
		]);

		const context = { field: 'numberField' };

		expect(number.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when all values are valid floating-point numbers', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '123.45' },
			{ name: 'numberField', value: '-0.001' },
		]);

		const context = { field: 'numberField' };

		expect(number.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when values are valid numbers in scientific notation', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '1e3' },
			{ name: 'numberField', value: '-2.5e-2' },
		]);

		const context = { field: 'numberField' };

		expect(number.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not a valid number', () => {
		const formDataTree = createMockFormData([
			{ name: 'numberField', value: '123' },
			{ name: 'numberField', value: 'invalid-number' },
		]);

		const context = { field: 'numberField' };

		expect(number.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
