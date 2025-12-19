const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('public'));

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blissmusafir';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// API Routes
// In your server.js / backend code:
// GET a single article by ID
app.get('/api/articles/:id', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const articleId = req.params.id;
    
    // Look for the string 'id' field you created in your POST route
    const article = await collection.findOne({ id: articleId });
    
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json(article);
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const category = req.query.category;
    const query = category ? { category } : {};
    
    const articles = await collection
      .find(query)
      .sort({ date: -1 })
      .toArray();
    
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const article = {
      ...req.body,
      id: new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await collection.insertOne(article);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

app.put('/api/articles', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const { id, ...updateData } = req.body;
    
    const result = await collection.updateOne(
      { id },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles', async (req, res) => {
  try {
    const db = client.db('blissmusafir');
    const collection = db.collection('articles');
    const id = req.query.id;
    
    if (!id) {
      return res.status(400).json({ error: 'Article ID is required' });
    }
    
    const result = await collection.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
