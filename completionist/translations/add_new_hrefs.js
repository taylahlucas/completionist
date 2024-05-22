const fs = require('fs');

// Function to add UUID to each object in the array
const compareHrefs = (objects, updateObject) => {
	return updateObject.map((obj, index) => ({
		...obj,
		href: objects[index].href
	}));
};

// Read JSON file
const readJsonFile = (filePath) => {
	try {
		const data = fs.readFileSync(filePath, 'utf8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Error reading JSON file:', err.message);
		return [];
	}
};

// Write JSON file
const writeJsonFile = (filePath, data) => {
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
		console.log('File updated successfully! ', filePath);
	} catch (err) {
		console.error('Error writing JSON file:', err.message);
	}
};

const languageList = ['ar', 'de', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'pt', 'tr', 'vi', 'zh'];


const filename = 'witcher3';
const jsonFilePath = `en/db/${filename}.json`;
const objects = readJsonFile(jsonFilePath);

languageList.forEach((lang) => {
	const updateJsonFilePath = `${lang}/db/${filename}.json`;

	// Read objects from the JSON file
	const objectsToUpdate = readJsonFile(updateJsonFilePath);

	// Add UUID to each object
	const objectsWithUuid = compareHrefs(objects, objectsToUpdate);

	// Write updated objects back to the JSON file
	writeJsonFile(updateJsonFilePath, objectsWithUuid);
});

