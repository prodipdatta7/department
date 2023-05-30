const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    division : {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', userSchema);

module.exports = Student;