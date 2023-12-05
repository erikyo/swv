import { expect, describe, it } from 'vitest';
import { minfilesize } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData, createMockFile } from "./utils.js";

describe('minfilesize validation', () => {
	it('passes when the total size of all files is greater than or equal to the minimum threshold', () => {
		const formDataTree = createMockFormData([
			createMockFile('minfilesize', 'file1.txt', 'text/plain', 600),
			createMockFile('minfilesize', 'file2.txt', 'text/plain', 400),
		]);

		const context = { field: 'minfilesize', threshold: '500' };

		expect(minfilesize.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when the total size of all files is less than the minimum threshold', () => {
		const formDataTree = createMockFormData([
			createMockFile('minfilesize', 'file1.txt', 'text/plain', 300),
			createMockFile('minfilesize', 'file2.txt', 'text/plain', 199),
		]);

		const context = { field: 'minfilesize', threshold: '500' };

		expect(minfilesize.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when a non-File value is present', () => {
		const formDataTree = createMockFormData([
			createMockFile('minfilesize', 'file1.txt', 'text/plain', 100),
			{ name: 'minfilesize', value: 'not-a-file', type: 'text' }, // Non-File value
		]);

		const context = { field: 'minfilesize', threshold: '500' };

		expect(minfilesize.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when no files are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'minfilesize', threshold: '0' };

		expect(minfilesize.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
