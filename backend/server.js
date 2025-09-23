// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import forumRoutes from './routes/Forum.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URI (Use the working URI directly)
const MONGODB_URI = 'mongodb+srv://swathi_21:ayugraph123@cluster0.gkl6y30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Use your forum, patient, and food routes
app.use('/api/forums', forumRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/foods', foodRoutes);

// Simple route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Welcome to the AyuGraph Backend API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});