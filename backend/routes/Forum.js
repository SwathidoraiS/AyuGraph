// backend/routes/Forum.js
import express from 'express';
import ForumPost from '../models/ForumPost.js';

const router = express.Router();

// GET all forum posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await ForumPost.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new forum post
router.post('/posts', async (req, res) => {
    const { title, content, author = "Dr. Anjali Sharma" } = req.body;
    const newPost = new ForumPost({ title, content, author });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (update) a post by ID
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await ForumPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE a post by ID
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await ForumPost.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;