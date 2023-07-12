const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const config = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "author.service2023@gmail.com",
        pass: process.env.APP_PASSWORD_WINDOWS,
    },
};

const data = {
    from: "author.service2023@gmail.com",
    to: "",
    subject: "",
    text: "",
};

const send = (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
};

async function getUsers(req, res) {
    try {
        const users = await Student.find();
        console.log(users);
        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function getUserById(req, res) {
    try {
        const user = await Student.findById(req.params.id).select("-password").populate("courses");
        console.log(user);
        if (user) {
            res.status(200).json({
                success: true,
                data: user,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}

async function createUser(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const payload = req.payload;
        payload.password = hashedPassword;
        const student = new Student(payload);
        console.log("student", student);
        const response = await student.save();
        if (!response) {
            res.status(500).json({
                success: false,
                message: "Error creating student account",
            });
        } else {
            data.to = payload.email;
            data.subject = `Thank you ${payload.name} for registering`;
            data.text = `Dear ${payload.name}, Thank you for registering to our portal.
Sincerly Admin`;
            const response = send(data);
            res.status(200).json({
                success: true,
                data: response,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating student account",
            error: error,
        });
    }
}

async function updateUser(req, res) {
    try {
        const oldData = await Student.findById(req.params.id);
        let newPassword = oldData.password;
        let oldPassword = req.body.password;
        if (oldPassword) {
            newPassword = bcrypt.hashSync(oldPassword, 10);
        }
        const payload = req.payload;
        payload.password = newPassword;
        const updatedData = await Student.findByIdAndUpdate(req.params.id, payload, {
            new: true,
        });
        if (!updatedData) {
            res.status(404).json({
                success: false,
                message: "Update failed. ID might be incorrect",
            });
        } else {
            res.status(200).json({ success: true, data: updatedData });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

async function login(req, res) {
    console.log(req.body);
    try {
        const user = await Student.findOne({
            email: req.body.email,
        });
        const secretKey = process.env.SECRET_KEY;
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found!" });
        }
        console.log(user, secretKey, req.body.password);
        const isEqual = bcrypt.compareSync(req.body.password, user.password);
        console.log(isEqual);
        if (isEqual === true) {
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
                secretKey,
                { expiresIn: "6h" }
            );
            res.status(200).json({
                success: true,
                data: user,
                token: token,
            });
        } else {
            res.status(404).json({ success: false, error: "Authorization failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

async function deleteUser(req, res) {
    try {
        await Student.findByIdAndRemove(req.params.id)
            .then((user) => {
                res.status(200).json({ success: true });
            })
            .catch((err) => {
                res.status(404).json({ success: false, error: err });
            });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

async function getUserByEmail(req, res) {
    try {
        const data = await Student.find(req.query);
        console.log(data);
        if (data) {
            res.status(200).json({
                success: true,
                data: data,
            });
        } else {
            res.status(200).json({
                success: false,
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
    getUsers,
    getUserById,
    createUser,
    updateUser,
    login,
    deleteUser,
    getUserByEmail,
};
