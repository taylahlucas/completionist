const fs = require('fs');
const {v4: uuidv4} = require('uuid');

// Function to transform titles into JSON objects
function transformTitlesToJSON(titles) {
  return titles.map(title => {
    return {
      id: uuidv4(),
      mainCategory: "Shadow Of The Erdtree",
      title: title,
      subCategory: "Scaduview",
      subCategoryType: '',
      dlc: 'Shadow Of The Erdtree',
      section: 'locations',
      // href: `https://www.ign.com/wikis/elden-ring/${title.replace(
      //   /\s+/g,
      //   '_',
      // )}_Questline`,
      href: `https://eldenring.wiki.fextralife.com/${title.replace(
        /\s+/g,
        '+',
      )}`,
    };
  });
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

const titles = [
  "Albinauric's Shack",
  "Finger Ruins of Dheo",
  "Scadutree Chalice",
  "Shaman Village"
];

const objects = transformTitlesToJSON(titles);

const jsonFilePath = 'test.json';
// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objects);
