const express = require('express');
const { userLogin, adminLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/userLogin', userLogin);
router.post('/adminLogin', adminLogin);


module.exports = router;
