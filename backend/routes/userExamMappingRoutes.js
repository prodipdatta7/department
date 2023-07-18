const express = require("express");

const {getDocumentsByUserId, createMapping} = require("../routeHandlers/userExamMappingController");
const router = express.Router();

router.get("/getDocumentsByUserId/:id", getDocumentsByUserId);
router.post('/createMapping', createMapping);


module.exports = router;
