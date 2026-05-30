require('dotenv').config();
const { MongoClient } = require('mongodb');

async function listSubscribers() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blissmusafir';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('blissmusafir');
    const col = db.collection('subscribers');
    const docs = await col.find({}).toArray();
    console.log('Found', docs.length, 'subscribers');
    docs.forEach(d => console.log(JSON.stringify(d)));
  } catch (err) {
    console.error('Error listing subscribers:', err);
  } finally {
    await client.close();
  }
}

listSubscribers();
