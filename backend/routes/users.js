const express = require("express");
const {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    login,
    deleteUser,
    getUserByEmail,
    updateRegisteredExams
} = require("../routeHandlers/userController");
const createPayload = require("../middlewares/createPayload");

const router = express.Router();
const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "./images");
    },
    filename: (req, file, cb) => {
        console.log("multer file", file);
        const name = file.originalname.toLowerCase().split(" ").join(",");
        const ext = MIME_TYPE_MAP[file.mimetype];
        const fileName = name + "-" + Date.now() + "." + ext;
        console.log("fileName", fileName);
        cb(null, fileName);
    },
});

router.get("/get-users", getUsers);
router.post("/register", multer({ storage: storage }).single("image"), createPayload, createUser);
router.get("/get-user/:id", getUserById);
router.put("/update/:id", multer({ storage: storage }).single("image"), createPayload, updateUser);
router.post("/login", login);
router.delete("/remove/:id", deleteUser);
router.get("/getByEmail", getUserByEmail);
router.put('/exam-registration/:id', createPayload, updateRegisteredExams)

module.exports = router;
