const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Function to transform titles into JSON objects
function transformTitlesToJSON(titles) {
  return titles.map(title => {
    return {
      id: uuidv4(),
      mainCategory: "Legendary Weapons",
      title: title,
      dlc: "None",
      subCategory: "",
      subCategoryType: "",
      section: "collectables",
      href: `https://eldenring.wiki.fextralife.com/${title.replace(/\s+/g, '+')}`
    }
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
  "Devourer's Scepter",
  "Grafted Blade Greatsword",
  "Sword of Night and Flame",
  "Ruins Greatsword",
  "Marais Executioner's Sword",
  "Dark Moon Greatsword",
  "Bolt of Gransax",
  "Eclipse Shotel",
  "Golden Order Greatsword"
];

const objects = transformTitlesToJSON(titles);

const jsonFilePath = 'test.json';
// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objects);