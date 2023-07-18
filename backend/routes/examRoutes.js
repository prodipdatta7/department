const express = require("express");

const {getExams, getExamById, updateSelectedExam, createNewExam, deleteExamById, registerStudent, getPdfFiles} = require("../routeHandlers/examController");
const payloadForExamUpdate = require("../middlewares/payloadForExamUpdate");
const router = express.Router();

router.get("/getExams", getExams);
router.get("/getExamById/:id", getExamById);
router.post("/createExam", payloadForExamUpdate, createNewExam);
router.put("/updateExam/:id", payloadForExamUpdate, updateSelectedExam);
router.delete("/remove/:id", deleteExamById);
router.put('/register/:id', payloadForExamUpdate, registerStudent);
router.post('/getDocuments', getPdfFiles);


module.exports = router;
