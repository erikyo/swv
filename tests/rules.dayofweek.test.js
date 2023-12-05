import { expect, describe, it } from 'vitest';
import { dayofweek } from "../rules/index.js";
import { ValidationError } from "../error.js";
import { createMockFormData } from "./utils.js";

describe('dayofweek validation', () => {
	it('passes when all values are acceptable days of the week', () => {
		const formDataTree = createMockFormData([
			{ name: 'dayField', value: '2023-04-03' },
			{ name: 'dayField', value: '2023-04-10' },
		]);

		const context = { field: 'dayField', accept: [1, 2] }; // Accepts Monday and Tuesday

		expect(dayofweek.bind(context, formDataTree)).not.toThrow(ValidationError);
	});

	it('throws when at least one value is not an acceptable day of the week', () => {
		const formDataTree = createMockFormData([
			{ name: 'dayField', value: '2023-04-03' }, // Monday
			{ name: 'dayField', value: '2023-04-10' }, // Tuesday
			{ name: 'dayField', value: '2023-04-12' }, // Thursday
		]);

		const context = { field: 'dayField', accept: [1, 2] }; // Accepts Monday and Tuesday

		expect(dayofweek.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the date format is invalid', () => {
		const formDataTree = createMockFormData([
			{ name: 'dayField', value: 'invalid-date' },
		]);

		const context = { field: 'dayField', accept: [1, 2] }; // Accepts Monday and Tuesday

		expect(dayofweek.bind(context, formDataTree)).toThrow(ValidationError);
	});

	it('throws when the day value is not in the accepted list', () => {
		const formDataTree = createMockFormData([
			{ name: 'dayField', value: '2023-04-03' }, // Monday
			{ name: 'dayField', value: '2023-04-10' }, // Tuesday
		]);

		const context = { field: 'dayField', accept: [3, 4] }; // Accepts Wednesday and Thursday

		expect(dayofweek.bind(context, formDataTree)).toThrow(ValidationError);
	});
});
