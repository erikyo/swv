
import {expect, describe, it} from 'vitest'
import {maxitems} from "../rules/index.js";
import {ValidationError} from "../error.js";
import {createMockFormData} from "./utils.js";

describe('passes when number of values is less than threshold', () => {
	it('should  ', () => {
		const formDataTree = createMockFormData([
			{ name: 'age', value: 99 },
			{ name: 'age', value: 1000 },
		])

		const context = { field: 'age', threshold: '3' }

		expect(maxitems.bind(context, formDataTree)).not.toThrow(ValidationError)
	});

	it('throws when number of values is greater than threshold', () => {
		const formDataTree = createMockFormData([
			{ name: 'age', value: 99 },
			{ name: 'age', value: 1000 },
		])

		const context = { field: 'age', threshold: '1' }

		expect(maxitems.bind(context, formDataTree)).toThrow(ValidationError)
	})
})
