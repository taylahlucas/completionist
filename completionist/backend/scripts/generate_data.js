const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Function to transform titles into JSON objects
function transformTitlesToJSON(titles) {
  return titles.map(title => {
    const cleanedTitle = title.replace(/\s*\(\d(?:st|nd|rd|th) Encounter\)/g, '');

    return {
      id: uuidv4(),
      mainCategory: "Liurnia of the Lakes",
      title: title,
      hold: "",
      dlc: "None",
      subCategory: "",
      subCategoryType: "",
      location: "Liurnia of the Lakes",
      conflictingIds: [],
      section: "quests",
      href: `https://eldenring.wiki.fextralife.com/${cleanedTitle.replace(/\s+/g, '+')}`
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
  "Boc the Seamster (2nd Encounter)",
  "Hyetta (2nd Encounter)",
  "Thops",
  "Patches (2nd Encounter)",
  "Rya (1st Encounter)",
  "Blackguard Big Boggart (1st Encounter)",
  "White Mask Varre (2nd Encounter)",
  "Edgar (3rd Encounter)",
  "Jar Bairn (1st Encounter)",
  "Diallos (1st Encounter)",
  "Bloody Finger Hunter Yura (2nd Encounter)",
  "Smithing Master Iji",
  "Seluvis",
  "Nepheli Loux (2nd Encounter)",
  "Pidia, Carian Servent",
  "Boc the Seamster (3rd Encounter)",
  "Albus",
  "Latenna (1st Encounter)",
  "Miriel",
  "D Hunter of the Dead (3rd Encounter)",
  "Festering Fingerprint Vyke",
  "Iron Fist Alexander (2nd Encounter)",
  "Sorcerer Rogier (2nd Encounter)"
];

const objects = transformTitlesToJSON(titles);

const jsonFilePath = 'test.json';
// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objects);