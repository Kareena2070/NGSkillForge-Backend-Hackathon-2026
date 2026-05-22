const express = require("express");

const router = express.Router();

const {
    updateProgressController
} = require("./progress.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const roleMiddleware = require("../../middleware/role.middleware");

router.patch(
    "/:courseId",
    authMiddleware,
    roleMiddleware("student"),
    updateProgressController
);

module.exports = router;