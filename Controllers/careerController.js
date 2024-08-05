
const Career = require('../models/Career');

// Get all careers
exports.getCareer = async (req, res) => {
    try {
        const career = await Career.find();
        res.json(career);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new career
exports.createCareer = async (req, res) => {
    const { title, description, requirements, location  } = req.body;
    const career = new Career({
        title,
        description,
        requirements,
        location
    });
    try {
        const newCareer = await career.save();
        res.status(201).json(newCareer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a career
exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findByIdAndDelete(req.params.id);
        if (career) {
            res.json({ message: 'Career deleted' });
        } else {
            res.status(404).json({ message: 'Career not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a category
exports.updateCareer = async (req, res) => {
    const {  title, description, requirements, location } = req.body;
    try {
        const career = await Career.findById(req.params.id);
        if (career) {
            career.title = title || career.title;
            career.description = description || career.description;
            career.requirements = requirements || career.requirements;
            career.location = location || career.location;
            const updatedCareer = await career.save();
            res.json(updatedCareer);
        } else {
            res.status(404).json({ message: 'Career not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
