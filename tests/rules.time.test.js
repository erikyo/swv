import { expect, describe, it } from 'vitest';
import { time } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('time validation', () => {
	it('passes when all values are valid time strings', () => {
		const formDataTree = createMockFormData([
			{ name: 'timeField', value: '12:30' },
			{ name: 'timeField', value: '23:45:00' },
		]);

		const context = { field: 'timeField' };

		expect(time.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not a valid time string', () => {
		const formDataTree = createMockFormData([
			{ name: 'timeField', value: 'invalid-time' },
			{ name: 'timeField', value: '25:00' }, // Invalid hour
		]);

		const context = { field: 'timeField' };

		expect(time.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the time format is not HH:mm:ss or HH:mm', () => {
		const formDataTree = createMockFormData([
			{ name: 'timeField', value: '12-30' },
			{ name: 'timeField', value: '18:45:30:00' },
		]);

		const context = { field: 'timeField' };

		expect(time.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the hour, minute, or second values are out of range', () => {
		const formDataTree = createMockFormData([
			{ name: 'timeField', value: '24:00' }, // Invalid hour
			{ name: 'timeField', value: '12:60' }, // Invalid minute
			{ name: 'timeField', value: '12:30:70' }, // Invalid second
		]);

		const context = { field: 'timeField' };

		expect(time.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
