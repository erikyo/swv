import { expect, describe, it } from 'vitest';
import { enumeration } from "../rules/enum.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('enumeration validation', () => {
	it('passes when all values are in the accepted list', () => {
		const formDataTree = createMockFormData([
			{ name: 'enumField', value: 'option1' },
			{ name: 'enumField', value: 'option2' },
		]);

		const context = { field: 'enumField', accept: ['option1', 'option2'] };

		expect(enumeration.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not in the accepted list', () => {
		const formDataTree = createMockFormData([
			{ name: 'enumField', value: 'option1' },
			{ name: 'enumField', value: 'invalid-option' },
		]);

		const context = { field: 'enumField', accept: ['option1', 'option2'] };

		expect(enumeration.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when no values are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'enumField', accept: ['option1', 'option2'] };

		expect(enumeration.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when the accepted list is empty', () => {
		const formDataTree = createMockFormData([
			{ name: 'enumField', value: 'value' },
		]);

		const context = { field: 'enumField', accept: [] };

		expect(enumeration.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when a non-string value is in the accepted list', () => {
		const formDataTree = createMockFormData([
			{ name: 'enumField', value: 'value' },
		]);

		const context = { field: 'enumField', accept: [42] };

		expect(enumeration.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
