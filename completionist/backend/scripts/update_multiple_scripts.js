const { addFieldToDocs, addSortKeyToDocs } = require('./add_field_to_docs');

const fileList = [
  'eldenRing.json',
  'fallout3.json',
  'fallout4.json',
  'skyrim.json',
  'witcher3.json',
];
const lang = 'zh';

const autoAdd = () => {
  fileList.forEach(file => {
    try {
      const gameName = file.replace(/\.json$/, '');
      addFieldToDocs(
        file,
        'sk',
        `GAME#${gameName}#LANG#${lang}`,
        'results.json',
      );
      console.log(
        `Field "GAME#${gameName}#LANG#${lang}" added to results.json`,
      );
    } catch (error) {
      console.error('Error adding to file: ', error.message);
    }
  });
};

// autoAdd();
addSortKeyToDocs();
