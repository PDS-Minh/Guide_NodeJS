import express from 'express';
import dotenv from 'dotenv';
import { connectDB, closeDB } from './db.js';
import { ObjectId } from 'mongodb';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const app = express();
const port = 3000;

// __dirname setting 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// set static file(public folder)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db;
let collection;

async function startServer() {
  try {
    const users = process.env.COLLECTION_USERS;
    db = await connectDB();
    collection = db.collection(users);

    app.listen(port, () => {
      console.log(`🚀 Running on http://localhost:${port}!`);
    });
  } catch (err) {
    console.error('❌ Server Start Error:', err);
  }
}

// Provide index.html on root URL request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Create User
app.post('/users', async (req, res) => {
  try {
    const newUser = req.body;
    const result = await collection.insertOne(newUser);
    res.status(201).json({ message: '📥 Success Create User!', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed Create User', details: err.message });
  }
});

// Search All User
app.get('/users', async (req, res) => {
  try {
    const users = await collection.find().toArray();
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed Search User', details: err.message });
  }
});

// Search User ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    // console.lod(req);
    const user = await collection.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: '❌ Not Found User.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed Found User', details: err.message });
  }
});

// Update User Info
app.put('/users/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const updateData = { $set: req.body };
    const result = await collection.updateOne({ _id: userId }, updateData);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: '❌ Not Found User' });
    }
    res.status(200).json({ message: '✏️ Success Patch User Info!' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed Patch User', details: err.message });
  }
});

// Delete User Info
app.delete('/users/:id', async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await collection.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: '❌ Not Found User for Delete.' });
    }
    res.status(200).json({ message: '🗑️ Success Delete User!' });
  } catch (err) {
    res.status(500).json({ error: '❌ Failed Delete User', details: err.message });
  }
});
startServer();