const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();
require('dotenv').config();

const client = new MongoClient(process.env.MONGO_URI);

// ✅ GET all questions
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('exampro');
    const questions = db.collection('questions');
    const data = await questions.find().toArray();
    res.json(data);
  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    res.status(500).send('Server error');
  }
});

// ➕ POST a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = req.body;
    await client.connect();
    const db = client.db('exampro');
    const questions = db.collection('questions');
    const result = await questions.insertOne(newQuestion);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error adding question:', error);
    res.status(500).send('Server error');
  }
});

// ✏️ PUT update a question by ID
router.put('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    const updatedQuestion = req.body;
    await client.connect();
    const db = client.db('exampro');
    const questions = db.collection('questions');
    const result = await questions.updateOne(
      { _id: new ObjectId(questionId) },
      { $set: updatedQuestion }
    );
    res.json(result);
  } catch (error) {
    console.error('❌ Error updating question:', error);
    res.status(500).send('Server error');
  }
});

// 🗑️ DELETE a question by ID
router.delete('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    await client.connect();
    const db = client.db('exampro');
    const questions = db.collection('questions');
    const result = await questions.deleteOne({ _id: new ObjectId(questionId) });
    res.json(result);
  } catch (error) {
    console.error('❌ Error deleting question:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;



// const express = require('express');
// const { MongoClient } = require('mongodb');
// const router = express.Router();
// require('dotenv').config();

// const client = new MongoClient(process.env.MONGO_URI);

// // Fetch all questions
// router.get('/', async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db('exampro'); // Your DB name
//     const questions = db.collection('questions'); // Your collection
//     const data = await questions.find().toArray();
//     res.json(data);
//   } catch (error) {
//     console.error('❌ Error fetching questions:', error);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
