const express = require("express");
const {
    getCourses,
    getCourseByParams,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseById,
} = require("../routeHandlers/courseController");
const router = express.Router();

router.get("/getCourses", getCourses);
router.get("/getCourseById/:id", getCourseById);
router.get("/getCoursesByParams", getCourseByParams);
router.post("/addCourse", addCourse);
router.put("/updateCourse/:id", updateCourse);
router.delete("/deleteCourse/:id", deleteCourse);

module.exports = router;
