const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB Atlas connection string
const uri = 'mongodb+srv://taylahlucasdev:JsSPrAgEMtht3QKC@completionist.eu0rfdl.mongodb.net/';

// JSON file path
const jsonFilePath = 'skyrim_quests.json';

async function insertData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('quests-db');
    const collection = database.collection('quests');

    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Insert data into MongoDB
    await collection.insertMany(jsonData);

    console.log('Data inserted successfully!');
  } finally {
    await client.close();
  }
}

insertData();
