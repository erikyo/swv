import { expect, describe, it } from 'vitest';
import { file } from "../rules/index.js";
import { ValidationError } from "../error.js";
import {createMockFile, createMockFormData} from "./utils.js";

describe('file validation', () => {
	it('passes when all files have acceptable types', () => {
		const formDataTree = createMockFormData([
			createMockFile('fileField', 'image.jpg', 'image/jpeg'),
			createMockFile('fileField', 'document.pdf', 'application/pdf'),
		]);

		const context = { field: 'fileField', accept: ['.jpg', 'application/pdf'] };

		expect(file.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one file has an unacceptable type', () => {
		const formDataTree = createMockFormData([
			createMockFile('fileField', 'image.jpg', 'image/jpeg'),
			createMockFile('fileField', 'audio.mp3', 'audio/mpeg'),
		]);

		const context = { field: 'fileField', accept: ['.jpg', 'application/pdf'] };

		expect(file.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the file type is not in the accepted list', () => {
		const formDataTree = createMockFormData([
			createMockFile('fileField', 'document.pdf', 'application/pdf'),
		]);

		const context = { field: 'fileField', accept: ['.jpg', 'audio/mpeg'] };

		expect(file.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the file field contains a non-File value', () => {
		const formDataTree = createMockFormData([
			{ name: 'fileField', value: 'not-a-file', type: 'text' },
		]);

		const context = { field: 'fileField', accept: ['.jpg'] };

		expect(file.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('not throws when the file field is empty', () => {
		const formDataTree = createMockFormData([]);

		const context = { field: 'fileField', accept: ['.jpg'] };

		expect(file.bind(context, formDataTree)).not.toThrow(ValidationError);
	});
});
