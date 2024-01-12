const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Function to add UUID to each object in the array
const addUuidToObjects = (objects) => {
  return objects.map((obj) => ({ 
      ...obj,
      subCategoryType: ""
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
    console.log('File updated successfully!');
  } catch (err) {
    console.error('Error writing JSON file:', err.message);
  }
};

// Specify the path to your JSON file
const jsonFilePath = 'skyrim_collectables.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

// Add UUID to each object
const objectsWithUuid = addUuidToObjects(objects);

// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objectsWithUuid);