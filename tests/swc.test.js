import { expect, describe, it } from 'vitest';
import { validate, ValidationError } from "../index";
import { createMockFormData } from "./utils.js";

describe.concurrent('Validation Tests', () => {
	it('should return an empty Map for valid form data with no rules', () => {
		const schema = {
			rules: [],
		};

		const formData = createMockFormData([
			{ name: 'name', value: 'John Doe' },
			{ name: 'email', value: 'john.doe@example.com'},
			{ name: 'age', value: 99 }
		]);

		const result = validate(schema, formData);
		expect(result).instanceOf(Map);
		expect(result.size).equal(0);
	});

	it('should return an empty Map for valid form data with matching rules', () => {
		const schema = {
			rules: [
				{
					"rule": "number",
					"field": "age",
					"error": "Please fill out this field."
				},
				{
					"rule": "minnumber",
					"field": "age",
					"threshold": 18,
					"error": "Please fill out this field."
				}
			],
		};

		const formData = createMockFormData([
			{ name: 'name', value: 'John Doe' },
			{ name: 'email', value: 'john.doe@example.com'},
			{ name: 'age', value: 99 }
		]);

		const result = validate(schema, formData);
		expect(result).instanceOf(Map);
		expect(result.size).equal(3);

		// Assuming 'age' is the field that passes validation
		const ageResult = result.get('age');
		expect(ageResult).toEqual({"validInputs": ["99"]});
	});

	it('should return a Map with validation errors for invalid form data', () => {
		const schema = {
			rules: [
				{
					"rule":  () => {},
					"field": "fake",
					"error": "Please fill out this field."
				},
				{
					"rule": "number",
					"field": "age",
					"error": "Please fill out this field."
				},
				{
					"rule": "email",
					"field": "email",
					"error": "Please enter an email address."
				},
			],
		};

		// Example usage
		const formData = createMockFormData([
			{ name: 'name', value: 'John Doe' },
			{ name: 'email', value: 'john.doeexample.com' },
			{ name: 'age', value: "99" }
		]);

		const result = validate(schema, formData);
		expect(result).instanceOf(Map);
		expect(result.size).not.equal(0);
		expect(result.size).equal(3);

		// Assuming 'age' is the field that passes validation
		const error2 = result.get('email');
		expect(error2).toBeInstanceOf(ValidationError);
	});

	it('should handle non-function rules and skip invalid rules', () => {
		const schema = {
			rules: [
				{
					"rule": "invalidRule", // Non-existent rule
					"field": "fake",
					"error": "Please fill out this field."
				},
				{
					"rule": "number",
					"field": "age",
					"error": "Please fill out this field."
				},
			],
		};

		const formData = createMockFormData([
			{ name: 'name', value: 'John Doe' },
			{ name: 'email', value: 'john.doe@example.com'},
			{ name: 'age', value: 99 }
		]);

		const result = validate(schema, formData);
		expect(result).instanceOf(Map);
		expect(result.size).equal(3);

		// Assuming 'age' is the field that passes validation
		const ageResult = result.get('age');
		expect(ageResult).toEqual({"validInputs": ["99"]});
	});
});
