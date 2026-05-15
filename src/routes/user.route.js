const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const {createUser,loginUser, getProfile, adminDashboard} = require('../controllers/user.controller');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get( "/admin", authMiddleware, roleMiddleware("admin"), adminDashboard);
module.exports = router;
