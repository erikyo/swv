import { expect, describe, it } from 'vitest';
import { maxfilesize } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData, createMockFile } from "./utils.js";

describe('maxfilesize validation', () => {
	it('passes when the total size of all files is less than or equal to the maximum threshold', () => {
		const formDataTree = createMockFormData([
			createMockFile('maxfilesize', 'file1.txt', 'text/plain', 100),
			createMockFile('maxfilesize', 'file2.txt', 'text/plain', 500),
		]);

		const context = { field: 'maxfilesize', threshold: 600 };

		expect(maxfilesize.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when the total size the file is bigger than to the maximum threshold', () => {
		const formDataTree = createMockFormData([
			createMockFile('maxfilesize', 'file1.txt', 'text/plain', 10000 ),
		]);

		const context = { field: 'maxfilesize', threshold: 10 };

		expect(maxfilesize.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the total size of all files is greater than the maximum threshold', () => {
		const formDataTree = createMockFormData([
			createMockFile('fileField', 'file1.txt', 'text/plain', 300),
			createMockFile('fileField', 'file2.txt', 'text/plain', 400),
		]);

		const context = { field: 'fileField', threshold: '500' };

		expect(maxfilesize.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('passes when a non-File value is present', () => {
		const formDataTree = createMockFormData([
			createMockFile('fileField', 'file1.txt', 'text/plain', 100),
			{ name: 'fileField', value: 'not-a-file', type: 'text' }, // Non-File value
		]);

		const context = { field: 'fileField', threshold: '500' };

		expect(maxfilesize.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('passes when no files are provided', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'fileField', threshold: '0' };

		expect(maxfilesize.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
