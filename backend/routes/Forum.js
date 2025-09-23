// backend/routes/Forum.js

import express from 'express';
import ForumPost from '../models/ForumPost.js'; // Corrected import name

const router = express.Router();

// Route to get all forum posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ date: -1 }); // Using ForumPost model
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new forum post (The POST route)
router.post('/posts', async (req, res) => {
    // Now destructuring both 'title' and 'content'
    const { title, content } = req.body;

    // The author is still a hardcoded string in the frontend, so we don't need to destructure it
    // The model defaults the author, so we can use that

    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const newPost = new ForumPost({ // Using the correct ForumPost model
        title,
        content
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;