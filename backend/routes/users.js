const express = require('express');
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    login,
    deleteUser,
    getUserByEmail,
} = require('../routeHandlers/userController');
const createPayload = require('../middlewares/createPayload');

const router = express.Router();

router.get('/get-users', getUsers);
router.post('/register', createPayload, createUser);
router.get('/get-user/:id', getUserById);
router.put('/update/:id', createPayload, updateUser);
router.post('/login', login);
router.delete('/remove/:id', deleteUser);
router.post('/get-by-email', getUserByEmail);

module.exports = router;
