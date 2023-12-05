import {expect, describe, it} from 'vitest'
import {email} from "../rules/email";
import {createMockFormData} from "./utils.js";

describe('Test email function', () => {
	const context = { field: 'email' }

	it('should pass for valid emails', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'test@example.com' }
		])
		expect(email.bind(context, formDataTree)).not.toThrowError();
	});

	it('should Not pass due short email (<6 chars)', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 't@e.o' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('should throw  for invalid emails', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'invalid-email' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('should handle valid emails with special characters', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user+name@example.co' }
		])
		expect(email.bind(context, formDataTree)).not.toThrowError();
	});

	it('should handle invalid emails with invalid characters', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user@name@domain.com' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('does not contain the strange characters', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user•0145@as.com' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('does not contain the tabs or newlines', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user•0145@\nas.com' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('match that end or start with any space, tab, newline, carriage return, null character, vertical tab, or dot', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user@domain.com.' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('missing domain', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user@domaincom' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('if a sub domain starts or ends with a whitespace character', () => {
	const formDataTree = createMockFormData([
		{ name: 'email', value: 'test@doma.\x0Bin\x0B.com' }
	])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('should handle invalid emails with double dots in the domain', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user@domain..com' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});

	it('should handle invalid emails with special characters in domain subparts', () => {
		const formDataTree = createMockFormData([
			{ name: 'email', value: 'user@do(main).com' }
		])
		expect(email.bind(context, formDataTree)).toThrowError();
	});
});
