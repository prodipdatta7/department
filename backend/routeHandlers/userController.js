const Student = require("../models/student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUsers(req, res) {
  try {
    const users = await Student.find();
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
    const user = await Student.findById(req.params.id).select("-password");
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
  console.log(req);
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      city: req.body.city,
      division: req.body.division,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      country: req.body.country,
      isAdmin: req.body.isAdmin,
    });
    const response = await student.save();
    if (!response) {
      res.status(500).json({
        success: false,
        message: "Error creating student account",
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
    const updatedData = await Student.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: newPassword,
        city: req.body.city,
        division: req.body.division,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
      },
      {
        new: true,
      }
    );
    if (!updatedData) {
      res.status(404).json({
        success: false,
        message: "Update failed. ID might be incorrect",
      });
    } else {
      res.status(404).json({ success: true, data: updatedData });
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
    if (bcrypt.compareSync(req.body.password, user.password) === true) {
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
    const data = await Student.findOne({ email: req.body.email });
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
