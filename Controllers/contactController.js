const ContactForm = require('../models/ContactForm');

// Process contact form data and save to database
exports.processContactForm = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    try {
        // Create a new contact form entry
        const contactForm = new ContactForm({
            firstname,
            lastname,
            email,
            message
        });

        // Save the contact form data to the database
        const savedContactForm = await contactForm.save();

        res.status(201).json({ message: 'Contact form submitted successfully', data: savedContactForm });
    } catch (err) {
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
