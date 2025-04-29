const { Router } = require('express');
const postsController = require('../controllers/post.controller');
const { authorizeUser } = require("../middlewares/auth.middleware");

const router = Router();

// Route to get all posts
router.get('/', authorizeUser, postsController.getPosts);

// Route to get a single post by ID
router.get('/:id', authorizeUser, postsController.getPostById);

// Route to create a new post
router.post('/', authorizeUser, postsController.createPost);

// Route to update a post by ID
router.put('/:id', authorizeUser, postsController.updatePost);

// Route to delete a post by ID
router.delete('/:id', authorizeUser, postsController.deletePost);

module.exports = router;