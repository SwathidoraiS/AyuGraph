import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DiscussionForum = () => {
    // Correct API endpoint
    const API_BASE_URL = 'http://localhost:5000/api/forums';

    // UI and data states
    const [discussionTopics, setDiscussionTopics] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [editingTopicId, setEditingTopicId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [replyingToId, setReplyingToId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [topicToDelete, setTopicToDelete] = useState(null);

    // Fetch discussion topics from the MongoDB backend
    const fetchTopics = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts`);
            setDiscussionTopics(response.data);
        } catch (error) {
            console.error("Error fetching discussion topics:", error);
        }
    };

    // Load topics on component mount
    useEffect(() => {
        fetchTopics();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTopicId) {
                const response = await axios.put(`${API_BASE_URL}/posts/${editingTopicId}`, newPost);
                setDiscussionTopics(discussionTopics.map(topic => 
                    topic._id === editingTopicId ? { ...topic, ...response.data } : topic
                ));
            } else {
                // Ensure newPost object contains both title and content
                const response = await axios.post(`${API_BASE_URL}/posts`, newPost);
                setDiscussionTopics([...discussionTopics, response.data]);
            }
            setNewPost({ title: '', content: '' });
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const confirmDelete = (topic) => {
        setTopicToDelete(topic);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!topicToDelete) return;
        try {
            await axios.delete(`${API_BASE_URL}/posts/${topicToDelete._id}`);
            setDiscussionTopics(discussionTopics.filter(topic => topic._id !== topicToDelete._id));
            setShowDeleteModal(false);
            setTopicToDelete(null);
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleEdit = (topic) => {
        setNewPost({ title: topic.title, content: topic.content });
        setEditingTopicId(topic._id);
        setIsFormVisible(true);
    };

    const handleLike = async (topic) => {
        const userId = "testuser123";
        const likedBy = topic.likedBy || [];
        const isLiked = likedBy.includes(userId);
        let newLikedBy = [];
        let newLikes = topic.likes;
    
        if (isLiked) {
            newLikedBy = likedBy.filter(id => id !== userId);
            newLikes -= 1;
        } else {
            newLikedBy = [...likedBy, userId];
            newLikes += 1;
        }
    
        try {
            const updatedTopic = { ...topic, likes: newLikes, likedBy: newLikedBy };
            await axios.put(`${API_BASE_URL}/posts/${topic._id}`, {
                likes: newLikes,
                likedBy: newLikedBy
            });
            setDiscussionTopics(discussionTopics.map(t =>
                t._id === topic._id ? updatedTopic : t
            ));
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };
    

    const handleReply = async (topicId, replyContent) => {
        try {
            const topic = discussionTopics.find(t => t._id === topicId);
            const newReplies = topic.replies ? [...topic.replies, {
                author: "Dr. Anjali Sharma",
                content: replyContent,
                createdAt: new Date().toISOString()
            }] : [{
                author: "Dr. Anjali Sharma",
                content: replyContent,
                createdAt: new Date().toISOString()
            }];
            
            await axios.put(`${API_BASE_URL}/posts/${topicId}`, { replies: newReplies });
            setDiscussionTopics(discussionTopics.map(t =>
                t._id === topicId ? { ...t, replies: newReplies } : t
            ));
            setReplyingToId(null);
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const filteredTopics = discussionTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-green-50 min-h-screen font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold text-green-700">CASE DISCUSSION FORUM</h1>
            </div>

            <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
                <div className="relative flex items-center w-full md:w-auto border border-green-300 rounded-full bg-white shadow-md px-4 py-2">
                    <input 
                        type="text" 
                        placeholder="Search forums" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full focus:outline-none placeholder-gray-500" 
                    />
                    <span className="text-xl text-gray-500 pl-2">🔍</span>
                </div>
                <button 
                    onClick={() => {
                        setNewPost({ title: '', content: '' });
                        setEditingTopicId(null);
                        setIsFormVisible(true);
                        setReplyingToId(null);
                    }}
                    className="w-full md:w-auto px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-medium transition duration-300"
                >
                    Add discussion topic
                </button>
            </div>

            {!isFormVisible && (
                filteredTopics.length === 0 ? (
                    <div className="p-6 bg-green-100 text-green-800 border border-green-300 rounded-xl shadow-md">
                        {searchQuery ? 'No matching topics found.' : 'There are no discussion topics yet in this forum'}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredTopics.map(topic => (
                            <div key={topic._id} className="p-6 bg-white border border-green-200 rounded-xl shadow-md">
                                <h3 className="text-xl font-semibold text-green-800 mb-2">{topic.title}</h3>
                                <p className="text-gray-700 mb-4">{topic.content}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span>Posted by: {topic.author} on {new Date(topic.createdAt).toLocaleDateString()}</span>
                                    <div className="ml-auto flex items-center gap-4">
                                        <button onClick={() => handleEdit(topic)} className="text-lg text-gray-600 hover:text-green-600 transition duration-300">✏️</button>
                                        <button onClick={() => confirmDelete(topic)} className="text-lg text-gray-600 hover:text-red-500 transition duration-300">🗑️</button>
                                        <button 
                                            onClick={() => handleLike(topic)} 
                                            className={`text-lg transition duration-300 ${topic.likedBy && topic.likedBy.includes("testuser123") ? 'text-red-500' : 'text-gray-600 hover:text-red-400'}`}
                                        >
                                            ❤️ {topic.likes}
                                        </button>
                                        <button onClick={() => setReplyingToId(replyingToId === topic._id ? null : topic._id)} className="font-bold text-sm text-green-600 hover:text-green-800 transition duration-300">
                                            Reply
                                        </button>
                                    </div>
                                </div>
                                {/* Replies and Reply Form Section */}
                                <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                                    {topic.replies && topic.replies.length > 0 && (
                                        <div className="mb-4">
                                            {topic.replies.map((reply, index) => (
                                                <div key={index} className="text-sm text-gray-600 mb-2">
                                                    <strong className="text-gray-800">{reply.author}:</strong> {reply.content}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {/* Reply Form */}
                                    {replyingToId === topic._id && (
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            const replyContent = e.target.reply.value;
                                            if (replyContent.trim()) {
                                                handleReply(topic._id, replyContent);
                                                e.target.reply.value = '';
                                            }
                                        }}>
                                            <input 
                                                type="text" 
                                                name="reply"
                                                placeholder="Write a reply..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                            <button 
                                                type="submit" 
                                                className="mt-2 px-3 py-1 text-xs text-white bg-green-600 rounded-md hover:bg-green-700 transition duration-300"
                                            >
                                                Post Reply
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
            
            {/* "Add discussion topic" Form */}
            {isFormVisible && (
                <div className="p-6 bg-white border border-green-200 rounded-xl shadow-md mt-6">
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="subject" className="block font-semibold mb-1 text-gray-700">Subject</label>
                            <input 
                                type="text"
                                id="subject"
                                name="title"
                                value={newPost.title}
                                onChange={handleInputChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">Message</label>
                            <textarea
                                id="message"
                                name="content"
                                value={newPost.content}
                                onChange={handleInputChange}
                                required
                                className="w-full h-48 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button 
                                type="submit"
                                className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 font-medium transition duration-300"
                            >
                                {editingTopicId ? 'Update post' : 'Post to forum'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setIsFormVisible(false)}
                                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 font-medium transition duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg font-medium mb-4">Are you sure you want to delete this post?</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                                Yes, Delete
                            </button>
                            <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscussionForum;