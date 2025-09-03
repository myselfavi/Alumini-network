const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.user.id;
        const newPost = new PostModel({ title, content, author });
        await newPost.save();
        const populatedPost = await newPost.populate("author", "name email type organization workExperience");
        res.status(201).json({ status: "success", message: "Post created successfully", data: populatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({ createdAt: -1 }).populate("author", "name email type organization workExperience");
        res.json({ status: "success", message: "Posts found", data: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id).populate("author", "name email type organization workExperience");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ status: "success", message: "Post found", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update and delete for future
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        ).populate("author", "name email type organization workExperience");
        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json({ status: "success", message: "Post updated successfully", data: updatedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id).populate("author", "name email type organization workExperience");
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.author._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }
        await PostModel.findByIdAndDelete(id);
        res.json({ status: "success", message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

