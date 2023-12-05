import { expect, describe, it } from 'vitest';
import { url } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('url validation', () => {
	it('passes when all values are valid absolute URLs with allowed protocols', () => {
		const formDataTree = createMockFormData([
			{ name: 'urlField', value: 'http://example.com' },
			{ name: 'urlField', value: 'https://www.example.com' },
		]);

		const context = { field: 'urlField' };

		expect(url.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not a valid absolute URL', () => {
		const formDataTree = createMockFormData([
			{ name: 'urlField', value: 'invalid-url' },
			{ name: 'urlField', value: 'ftp://example.com' }, // Invalid protocol
		]);

		const context = { field: 'urlField' };

		expect(url.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the URL has an invalid protocol', () => {
		const formDataTree = createMockFormData([
			{ name: 'urlField', value: 'javascript:alert("Hello")' }, // Invalid protocol
		]);

		const context = { field: 'urlField' };

		expect(url.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the URL has an empty string', () => {
		const formDataTree = createMockFormData([
			{ name: 'urlField', value: '' }, // Empty URL
		]);

		const context = { field: 'urlField' };

		expect(url.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
