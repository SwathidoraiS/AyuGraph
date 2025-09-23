import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Dr. Anjali Sharma' },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // Array to store user IDs who liked the post
    replies: [
        {
            author: { type: String, default: 'Dr. Anjali Sharma' },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

export default mongoose.model('ForumPost', forumPostSchema);