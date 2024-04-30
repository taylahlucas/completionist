const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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

// Check for duplicate identifiers
const checkDuplicateIdentifiers = (data) => {
  const seenIds = {};
  const duplicateIds = [];

  data.forEach((item) => {
    const { id } = item;

    if (seenIds[id]) {
      duplicateIds.push(id);
    } else {
      seenIds[id] = true;
    }
  });

  console.log(duplicateIds)
}

const updateDuplicateIdentifiers = (objects) => {
	const seenIds = {};
  const duplicateIds = [];

  const updatedList = objects.map((item) => {
    const { id } = item;

    if (seenIds[id]) {
      duplicateIds.push(id);
			return ({
				...item,
				id: uuidv4()
			})
    } else {
      seenIds[id] = true;
			return item
    }
  });
	return updatedList;
}

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
const jsonFilePath = 'skyrim.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

console.log("BEFORE")
checkDuplicateIdentifiers(objects);
const objectsWithUniqueId = updateDuplicateIdentifiers(objects)
// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objectsWithUniqueId);

console.log("AFTER")
const newObjects = readJsonFile(jsonFilePath);
checkDuplicateIdentifiers(newObjects);