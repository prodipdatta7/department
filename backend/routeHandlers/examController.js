const Examination = require("../models/examModel");
const UserExamMapping = require('../models/userExamMappingModel');
const {createPdf} = require('../middlewares/createPdf');
async function getExams(req, res) {
    try {
        let regexExp = {};
        if (req.query?.examName) {
            Object.assign(regexExp, { examName: new RegExp("^" + req.query.examName.toLowerCase(), "i") });
        }
        if (req.query?.status) {
            Object.assign(regexExp, { status: new RegExp("^" + req.query.status.toLowerCase(), "i") });
        }
        const exams = await Examination.find(regexExp);
        if (exams) {
            res.status(200).json({ success: true, examList: exams });
        } else {
            res.status(204).json({ success: false, message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function getExamById(req, res) {
    try {
        const selectedExam = await Examination.findById(req.params.id).populate("courses").populate("registeredStudents");
        if (selectedExam) {
            res.status(200).json({ success: true, exam: selectedExam });
        } else {
            res.status(204).json({ success: false, message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function createNewExam(req, res) {
    try {
        const exam = new Examination(req.payload);
        const response = await exam.save();
        if (!response) {
            res.status(500).json({
                success: false,
                message: "There are some issues in creating.",
            });
        } else {
            res.status(200).json({
                success: true,
                data: response,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function updateSelectedExam(req, res) {
    try {
        const exam = await Examination.findByIdAndUpdate(req.params.id, req.payload, { new: true });
        if (!exam) {
            res.status(404).json({
                success: false,
                message: "There are some issues in updating. ID might be incorrect.",
            });
        } else {
            res.status(200).json({
                success: true,
                exam: exam,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function deleteExamById(req, res) {
    try {
        await Examination.findByIdAndRemove(req.params.id)
            .then((response) => {
                res.status(202).json({ success: true, exam: response });
            })
            .catch((err) => {
                res.status(404).json({ success: false, message: "exam not deleted." });
            });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

async function getPdfFiles(req, res) {
    try {
        const filePath = createPdf(req.body);
        const body = {
            user: req.body.userId,
            exam: req.body.examId,
            filePath: filePath
        };
        const instance = new UserExamMapping(body);
        await instance.save();
        res.status(200).json({
            success: true,
            file: filePath
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function registerStudent(req, res) {
    try {
        const exam = await Examination.findByIdAndUpdate(req.params.id, req.payload, {new: true});
        if (!exam) {
            res.status(404).json({
                success: false,
                message: "There are some issues in updating. ID might be incorrect.",
            });
        } else {
            res.status(200).json({
                success: true,
                exam: exam,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

module.exports = {
    getExams,
    getExamById,
    createNewExam,
    updateSelectedExam,
    deleteExamById,
    registerStudent,
    getPdfFiles
};
