const express = require('express');
const router = express.Router();
const careerController = require('../Controllers/careerController');
const authMiddleware = require('../Middlewares/auth');

router.get('/', careerController.getCareer);
router.post('/', authMiddleware.verifyAdmin, careerController.createCareer);
router.delete('/:id', authMiddleware.verifyAdmin, careerController.deleteCareer);
router.put('/:id', authMiddleware.verifyAdmin, careerController.updateCareer);

module.exports = router;

