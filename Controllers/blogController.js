const Blog = require('../models/Blogs');

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('category');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new blog
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (blog) {
            res.json({ message: 'Blog deleted' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            blog.author = req.body.author || blog.author;
            blog.category = req.body.category || blog.category;
            blog.image = req.body.image || blog.image;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
