const express = require('express');
const router = express.Router();
const jobApplicationController = require('../Controllers/jobApplicationController');
const authMiddleware = require('../Middlewares/auth');
const upload = require('../Middlewares/multerConfig'); // Import multer config

// Define the routes
router.post('/submit', upload.single('resume'), jobApplicationController.submitJobApplication); // Use multer for file upload
router.get('/', jobApplicationController.getJobApplications);
router.delete('/:id', authMiddleware.verifyAdmin, jobApplicationController.deleteJobApplication);

module.exports = router;

