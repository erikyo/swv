import { expect, describe, it } from 'vitest';
import { minlength } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('minlength validation', () => {
	it('passes when the total length of all values is greater than or equal to the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 'abc' },
			{ name: 'textField', value: 'def' },
		]);

		const context = { field: 'textField', threshold: '5' };

		expect(minlength.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when the total length of all values is less than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 'abc' },
			{ name: 'textField', value: 'def' },
		]);

		const context = { field: 'textField', threshold: '10' };

		expect(minlength.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when a non-string value is present', () => {
		const formDataTree = createMockFormData([
			{ name: 'textField', value: 'abc' },
			{ name: 'textField', value: 123 }, // Non-string value
		]);

		const context = { field: 'textField', threshold: '5' };

		expect(minlength.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when the total length is calculated from empty values', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'textField', threshold: '5' };

		expect(minlength.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when no values are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'textField', threshold: '0' };

		expect(minlength.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
