const UserExamMapping = require('../models/userExamMappingModel');

async function createMapping(req, res) {
    try {
        const mapping = new UserExamMapping(req.body);
        const response = await mapping.save();
        res.status(200).json({success: true, data: response});
    } catch (error) {
        res.status(500).json({success: false, error: error});
    }
}
async function getDocumentsByUserId(req, res) {}

module.exports = {
    createMapping,
    getDocumentsByUserId
};
