const ContactForm = require('../models/ContactForm');

// Process contact form data and save to database
exports.processContactForm = async (req, res) => {
    const { firstname, lastname, email, department, message } = req.body;

    console.log("Received contact form data:", { firstname, lastname, email, department, message });

    try {
        const contactForm = new ContactForm({
            firstname,
            lastname,
            email,
            department,
            message
        });

        const savedContactForm = await contactForm.save();
        // console.log("Saved contact form data:", savedContactForm);
        res.status(201).json({ message: 'Contact form submitted successfully', data: savedContactForm });
    } catch (err) {
        console.error("Error saving contact form:", err);
        res.status(500).json({ message: err.message });
    }
};



// Get all contact form entries
exports.getContactForms = async (req, res) => {
    try {
        const contactForms = await ContactForm.find();
        res.json(contactForms);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a contact form entry
exports.deleteContactForm = async (req, res) => {
    try {
        const contactForm = await ContactForm.findByIdAndDelete(req.params.id);
        if (contactForm) {
            res.json({ message: 'Contact form entry deleted' });
        } else {
            res.status(404).json({ message: 'Contact form entry not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
