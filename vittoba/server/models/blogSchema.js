const mongoose = require('mongoose');

// Define the schema
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    tags: {
        type: String
    },
    image: {
        type: String,
    }
});

// Create a model based on the schema
const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
