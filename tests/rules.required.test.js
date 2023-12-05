import { expect, describe, it } from 'vitest';
import { required } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('required validation', () => {
	it('passes when at least one value is provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 'example' },
		]);

		const context = { field: 'textField' };

		expect(required.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when no value is provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'textField' };

		expect(required.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when multiple values are provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 'value1' },
			{ name: 'textField', value: 'value2' },
		]);

		const context = { field: 'textField' };

		expect(required.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('success when non-empty but falsy values are provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 0 }, // Falsy value
		]);

		const context = { field: 'textField' };

		expect(required.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
