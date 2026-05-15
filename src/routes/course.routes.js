const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const { createCourse, getCourses, getSingleCourse, updateCourse, deleteCourse} = require("../controllers/course.controller");

router.post("/create", authMiddleware, roleMiddleware("instructor", "admin"), createCourse );

router.get("/", getCourses);

router.get("/:id", getSingleCourse);

router.patch("/:id", authMiddleware, roleMiddleware("instructor", "admin"), updateCourse);

router.delete("/:id", authMiddleware, roleMiddleware("instructor", "admin"), deleteCourse);

module.exports = router;