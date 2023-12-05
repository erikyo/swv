/**
 * Creates a mock FormData object based on an array of form data fields.
 * Each field object in the array should have a "name" and "value" property.
 * This function filters out invalid fields and appends the valid fields to the FormData object.
 *
 * @param {Array} formDataArray - Array of form data fields.
 * @returns {FormData} - The mock FormData object.
 */
export const createMockFormData = (formDataArray) => {
	const formData = new FormData();

	if (Array.isArray(formDataArray)) {
		formDataArray.forEach((field) => {
			if (field && typeof field === 'object' && 'name' in field && 'value' in field) {
				formData.append(field.name, field.value);
			}
		});
	}

	return formData;
};


/*
// Example usage
	const formDataArray = [
		{ name: 'name', value: 'John Doe' },
		{ name: 'email', value: 'example.com' },
		{ name: 'age', value: 25 },
	];

	const formData = createMockFormData(formDataArray);
*/

/**
 * Creates a mock file object for testing purposes.
 *
 * @param {string} fieldName - The name of the field for the file object.
 * @param {string} fileName - The name of the file.
 * @param {string} fileType - The type or MIME of the file.
 * @param {number} fileSize - The size of the file in bytes.
 * @returns {Object} - The mock file object.
 */
export const createMockFile = (fieldName, fileName, fileType, fileSize = 0) => {
	const mockFile = new File([''], fileName, { type: fileType });
	Object.defineProperty(mockFile, 'size', { value: fileSize });

	return {
		name: fieldName,
		value: mockFile
	};
};
