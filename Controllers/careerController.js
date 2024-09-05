const Career = require('../models/Career');

// Get all careers with pagination
exports.getCareer = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const careers = await Career.find({}, 'title location')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const total = await Career.countDocuments();
        
        res.json({
            careers,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new career
exports.createCareer = async (req, res) => {
    const { title, description, roleOverview, location, primaryResponsibilities, experience, numberOfVacancies, workingHours, workingDays, salary, deadline } = req.body;
    
    const career = new Career({
        title,
        description,
        roleOverview,
        location,
        primaryResponsibilities,
        experience,
        numberOfVacancies,
        workingHours,
        workingDays,
        salary,
        deadline
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

// Update a career
exports.updateCareer = async (req, res) => {
    const { title, description, roleOverview, location, primaryResponsibilities, experience, numberOfVacancies, workingHours, workingDays, salary, deadline } = req.body;

    try {
        const career = await Career.findById(req.params.id);
        if (career) {
            career.title = title || career.title;
            career.description = description || career.description;
            career.roleOverview = roleOverview || career.roleOverview;
            career.location = location || career.location;
            career.primaryResponsibilities = primaryResponsibilities || career.primaryResponsibilities;
            career.experience = experience || career.experience;
            career.numberOfVacancies = numberOfVacancies || career.numberOfVacancies;
            career.workingHours = workingHours || career.workingHours;
            career.workingDays = workingDays || career.workingDays;
            career.salary = salary || career.salary;
            career.deadline = deadline || career.deadline;
            
            const updatedCareer = await career.save();
            res.json(updatedCareer);
        } else {
            res.status(404).json({ message: 'Career not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
