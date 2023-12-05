// We need to import jest to be able to define the mock and run the tests
import {convertMimeToExt, getMimeTypes} from "../helpers";
import {expect, describe, it} from 'vitest'

// test cases
describe('convertMimeToExt', () => {
	it('should return correct extension(s) for given MIME type', () => {
		const mimeTypes = getMimeTypes();

		expect(convertMimeToExt("image/gif", mimeTypes)).toEqual(['gif']);
		expect(convertMimeToExt("image/jpeg", mimeTypes)).toEqual(['jpg', 'jpeg', "jpe"]);
		expect(convertMimeToExt("application/vnd.ms-excel", mimeTypes)).toEqual(['xla','xls','xlt','xlw']);
	});

	it('should return empty array if MIME type is not valid', () => {
		const mimeTypes = getMimeTypes();

		// Testing with different invalid MIME types
		expect(convertMimeToExt("invalid", mimeTypes)).toEqual([]);
		expect(convertMimeToExt("image_no_subtype", mimeTypes)).toEqual([]);
		expect(convertMimeToExt("*/jpeg", mimeTypes)).toEqual([]);
		expect(convertMimeToExt("image/* and more", mimeTypes)).toEqual([]);
		expect(convertMimeToExt("console.log()", mimeTypes)).toEqual([]);
		expect(convertMimeToExt("image/jpeeeeg", mimeTypes)).toEqual([]);
	});

	it('should return empty array if MIME type not found', () => {
		const getMimeTypes = () => new Map([
			["ext1|ext2", "type1/subtype1"],
		]);

		expect(convertMimeToExt("type2/subtype2", getMimeTypes)).toEqual([]);
		expect(convertMimeToExt("type3/subtype4", getMimeTypes)).toEqual([]);
	});
});
