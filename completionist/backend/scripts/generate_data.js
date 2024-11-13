const fs = require('fs');
const {v4: uuidv4} = require('uuid');

// Function to transform titles into JSON objects
function transformTitlesToJSON(titles) {
  return titles.map(title => {
    return {
      id: uuidv4(),
      mainCategory: 'Limegrave',
      title: title,
      dlc: 'None',
      subCategory: '',
      subCategoryType: '',
      section: 'locations',
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
  "Artist's Shack (Limgrave)",
  'Bridge of Sacrifice',
  'Chapel of Anticipation',
  'Church of Dragon Communion',
  'Church of Elleh',
  'Coastal Cave',
  'Deathtouched Catacombs',
  'Divine Tower of Limgrave',
  'Dragon-Burnt Ruins',
  'Forlorn Hound Evergaol',
  'Fort Haight',
  "Fringefolk Hero's Grave",
  'Gatefront Ruins',
  'Groveside Cave',
  'Highroad Cave',
  'Limgrave Colosseum',
  'Limgrave Tunnels',
  'Minor Erdtree (Mistwood)',
  'Mistwood',
  'Mistwood Ruins',
  'Murkwater Catacombs',
  'Murkwater Cave',
  'Siofra River Well',
  'Starfall Crater',
  'Stormfoot Catacombs',
  'Stormgate',
  'Stormhill',
  'Stormhill Evergaol',
  'Stormhill Shack',
  'Stranded Graveyard',
  'Summonwater Village',
  'Third Church of Marika',
  "Warmaster's Shack",
  'Waypoint Ruins',
];

const objects = transformTitlesToJSON(titles);

const jsonFilePath = 'test.json';
// Write updated objects back to the JSON file
writeJsonFile(jsonFilePath, objects);
