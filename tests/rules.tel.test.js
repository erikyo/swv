import { expect, describe, it } from 'vitest';
import { tel } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('tel validation', () => {
	it('passes when all values are valid telephone numbers', () => {
		const formDataTree = createMockFormData([
			{ name: 'telField', value: '+123456789' },
			{ name: 'telField', value: '987654321' },
		]);

		const context = { field: 'telField' };

		expect(tel.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when all values are valid telephone numbers with special characters', () => {
		const formDataTree = createMockFormData([
			{ name: 'telField', value: '(123) 456-7890' },
			{ name: 'telField', value: '+1 987-654-3210' },
		]);

		const context = { field: 'telField' };

		expect(tel.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not a valid telephone number', () => {
		const formDataTree = createMockFormData([
			{ name: 'telField', value: 'invalid-number' },
			{ name: 'telField', value: '123-456-7890 ext. 123' },
		]);

		const context = { field: 'telField' };

		expect(tel.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the telephone number has invalid characters', () => {
		const formDataTree = createMockFormData([
			{ name: 'telField', value: '+1 🚀 (800) 555-1234' }, // Contains invalid characters
		]);

		const context = { field: 'telField' };

		expect(tel.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the telephone number starts with an invalid character', () => {
		const formDataTree = createMockFormData([
			{ name: 'telField', value: 'x123456789' }, // Starts with an invalid character
		]);

		const context = { field: 'telField' };

		expect(tel.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
