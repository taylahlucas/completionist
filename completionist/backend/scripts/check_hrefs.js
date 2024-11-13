// Checks if hrefs actually exist
const fs = require('fs');

async function checkUrlResponse(url) {
	const delay = 1000;
	try {
		const response = await fetch(url, {
			method: 'HEAD',
			headers: {
					'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
					'Content-Type': 'application/json'
			}
		});
		console.log("response: ", response)
		if (response.ok) {
			return;
		} else {
			console.log(`${url}`)
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
const jsonFilePath = 'eldenring_miscellaneous.json';

// Read objects from the JSON file
const objects = readJsonFile(jsonFilePath);

printOutput(objects);