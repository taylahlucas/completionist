const fs = require('fs');

async function checkUrlResponse(url) {
	const delay = 1000;
	try {
		const response = await fetch(url);
		if (response.ok) {
			return;
		} else {
			console.log(`${url}`);
			return;
		}
	} catch (error) {
		console.error(`Error checking URL ${url}: ${error.message}`);
		return;
	}
	finally {
		const randomDelay = Math.floor(Math.random() * (delay - delay / 2)) + delay / 2;
		await new Promise(resolve => setTimeout(resolve, randomDelay));
		return;
	}
}

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

const printOutput = (objects) => {
	objects.forEach((obj) => {
		checkUrlResponse(obj.href);
	})
};

// Specify the path to your JSON file
const jsonFilePath = 'fallout4-test.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

printOutput(objects);