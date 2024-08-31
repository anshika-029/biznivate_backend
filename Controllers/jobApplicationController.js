const JobApplication = require('../Models/JobApplication');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // Accept only specific file types
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    },
    fileFilter: fileFilter
});

// Controller to handle job application submission
exports.submitJobApplication = async (req, res) => {
    const { fullname, country, email } = req.body;
    const resume = req.file.path; // Path to the uploaded resume file

    try {
        // Create a new job application record
        const newJobApplication = new JobApplication({
            fullname,
            country,
            email,
            resume
        });

        // Save the job application to the database
        await newJobApplication.save();

        // Send a success response
        res.status(201).json({ message: 'Job application submitted successfully!' });
    } catch (error) {
        console.error('Error saving job application:', error);
        res.status(500).json({ message: 'Failed to submit job application.' });
    }
};

// Controller to retrieve all job applications
exports.getJobApplications = async (req, res) => {
    try {
        // Fetch all job applications from the database
        const jobApplications = await JobApplication.find();
        res.status(200).json(jobApplications);
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Failed to retrieve job applications.' });
    }
};

// Controller to delete a specific job application
exports.deleteJobApplication = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the job application by ID
        const deletedJobApplication = await JobApplication.findByIdAndDelete(id);

        if (!deletedJobApplication) {
            return res.status(404).json({ message: 'Job application not found.' });
        }

        // Send a success response
        res.status(200).json({ message: 'Job application deleted successfully.' });
    } catch (error) {
        console.error('Error deleting job application:', error);
        res.status(500).json({ message: 'Failed to delete job application.' });
    }
};

// Export the multer upload configuration for use in routes
exports.upload = upload;
