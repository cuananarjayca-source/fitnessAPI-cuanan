const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/details', protect, getUserDetails);

module.exports = router;