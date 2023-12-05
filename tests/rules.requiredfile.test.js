import { expect, describe, it } from 'vitest';
import { requiredfile } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('requiredfile validation', () => {
	it('passes when at least one file is provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'fileField', value: 'file1.txt', type: 'file' },
		]);

		const context = { field: 'fileField' };

		expect(requiredfile.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when no file is provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'fileField' };

		expect(requiredfile.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when multiple files are provided', () => {
		const formDataTree = createMockFormData([
			{ name: 'fileField', value: 'file1.txt', type: 'file' },
			{ name: 'fileField', value: 'file2.txt', type: 'file' },
		]);

		const context = { field: 'fileField' };

		expect(requiredfile.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when non-file values are present', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'fileField' };

		expect(requiredfile.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
