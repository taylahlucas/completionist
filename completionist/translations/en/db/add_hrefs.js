const fs = require('fs');

function convertToSnakeCase(string) {
	// Replace spaces with underscores
	const snakeCaseString = string.replace(/ /g, "_");
	return snakeCaseString;
}
// Function to add UUID to each object in the array
const addHrefToObjects = (objects) => {
  return objects.map((obj) => ({ 
      ...obj,
			href: !obj.href ? `https://fallout.fandom.com/wiki/${convertToSnakeCase(obj.title)}` : obj.href
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

// Specify the path to your JSON file
const jsonFilePath = 'fallout4-test.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

// Add UUID to each object
const objectsWithUuid = addHrefToObjects(objects);

// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objectsWithUuid);