const express = require('express');
const router = express.Router();
const contactFormController = require('../Controllers/contactController');
const authMiddleware = require('../Middlewares/auth');

router.post('/submit', contactFormController.processContactForm);
router.get('/', contactFormController.getContactForms);
router.delete('/:id', authMiddleware.verifyAdmin, contactFormController.deleteContactForm);

module.exports = router;
