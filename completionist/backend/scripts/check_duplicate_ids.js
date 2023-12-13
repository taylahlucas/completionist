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

// Specify the path to your JSON file
const jsonFilePath = 'skyrim_locations.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

checkDuplicateIdentifiers(objects);