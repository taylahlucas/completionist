const fs = require('fs');

// Input params:
// isAuto=boolean
// file='file_path.json'
// field='key_of_new_field'
// value='value_to_add'
// e.g. node add_field_to_docs.js file='eldenRing.json' field='pk' value='GAME#eldenRing#LANG#en'
const args = process.argv.slice(2);
const params = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key] = value;
  return acc;
}, {});

if (Object.keys(params).length > 0) {
  // Read objects from the JSON file
  const objects = readJsonFile(params.file);

  // Add or update field with value to each object
  const updatedObjects = addFieldToObjects(objects, params.field, params.value);

  // Write updated objects back to the JSON file
  writeJsonFile(updatedObjects, params.file);
  return;
}

// Read JSON file
const readJsonFile = file => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err.message);
    return [];
  }
};

const addFieldToObjects = (objects, field, value) => {
  return objects.map(obj => ({
    ...obj,
    [field]: value,
  }));
};

const addSortKeyToObjects = objects => {
  return objects.map(obj => ({
    ...obj,
    sk: !!obj.subCategory
      ? `${obj.section}#MAIN#${obj.mainCategory}#SUB#${obj.subCategory}`
      : `${obj.section}#MAIN#${obj.mainCategory}`,
  }));
};

// Write JSON file
const writeJsonFile = (data, file) => {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    console.log('File updated successfully! ', file);
  } catch (err) {
    console.error('Error writing JSON file:', err.message);
  }
};

// Can either call this to run on multiple fields or use the console command above
const addFieldToDocs = (file, field, value, resultFile) => {
  // Read objects from the JSON file
  const objectsToUpdate = readJsonFile(file);

  // Add or update field with value to each object
  const updatedObjects = addFieldToObjects(objectsToUpdate, field, value);

  // Get current objects from result
  const currentObjects = readJsonFile(resultFile);
  let allObjects = updatedObjects;
  if (currentObjects.length > 0) {
    allObjects = [...currentObjects, ...updatedObjects];
  }

  // Write updated objects back to the JSON file
  writeJsonFile(allObjects, resultFile);
};

const addSortKeyToDocs = () => {
  const objectsToUpdate = readJsonFile('gameData.json');

  const updatedObjects = addSortKeyToObjects(objectsToUpdate);

  // // Get current objects from result
  // const currentObjects = readJsonFile('result.json');
  // let allObjects = updatedObjects;
  // if (currentObjects.length > 0) {
  //   allObjects = [...currentObjects, ...updatedObjects];
  // }

  // Write updated objects back to the JSON file
  writeJsonFile(updatedObjects, 'result.json');
};

module.exports = { addFieldToDocs, addSortKeyToDocs };
