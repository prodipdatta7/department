const Course = require("../models/courseModel");

async function getCourses(req, res) {
    try {
        console.log(req.query);
        let regexExp = {};
        if (req.query?.courseName) {
            Object.assign(regexExp, { courseName: new RegExp("^" + req.query.courseName.toLowerCase(), "i") });
        }
        const courses = await Course.find(regexExp);
        res.status(200).json({ success: true, count: courses.length, courses: courses });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

async function getCourseByParams(req, res) {
    try {
        const requestObject = req.params;
        const courses = await Course.find(requestObject);
        res.status(200).json({ success: true, count: courses.length, courses: courses });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}
async function getCourseById(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        console.log(course);
        if (course) {
            res.status(200).json({
                success: true,
                course: course,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}
async function addCourse(req, res) {
    try {
        const payload = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            courseContactHours: req.body.courseContactHours,
            courseCredits: req.body.courseCredits,
            courseCoverageSemester: req.body.courseCoverageSemester,
            courseCoverageDepartment: req.body.courseCoverageDepartment,
        };
        const course = new Course(payload);
        const response = await course.save();
        if (!response) {
            res.status(500).json({ success: false, message: `Course can't be added.` });
        } else {
            res.status(200).json({ success: true, course: response });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}
async function updateCourse(req, res) {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ success: false, message: "course not found" });
        const payload = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            courseContactHours: req.body.courseContactHours,
            courseCredits: req.body.courseCredits,
            courseCoverageSemester: req.body.courseCoverageSemester,
            courseCoverageDepartment: req.body.courseCoverageDepartment,
        };
        const response = await Course.findByIdAndUpdate(req.params.id, payload, { new: true });
        res.status(200).json({ success: true, course: response });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}
async function deleteCourse(req, res) {
    try {
        await Course.findByIdAndRemove(req.params.id)
            .then((response) => {
                res.status(202).json({ success: true, course: response });
            })
            .catch((err) => {
                res.status(404).json({ success: false, message: "course not deleted." });
            });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

module.exports = {
    getCourses,
    getCourseById,
    getCourseByParams,
    addCourse,
    updateCourse,
    deleteCourse,
};
