const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const stripe = require('stripe')('sk_test_51NVWxISFC5KjlFjgt6lfly5Y7BQVtoAMEAEfbCHlXGx4Pk4fgBqlf3jQBW7J0JOGRHcnsosq8sCpX4aP1yY9nTTg00SlKAJ78c');

const app = express();
dotenv.config();
app.use(morgan("tiny"));
app.use(express.static("public"));

// database connection
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("database connection successful.");
    })
    .catch((err) => {
        console.log("database connection error: ", err);
    });

// Routes
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courseRoutes");
const examRoutes = require("./routes/examRoutes");
const userExamMappingRoutes = require('./routes/userExamMappingRoutes');
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "pdf-files")));
app.use((req, res, next) => {
    console.log("common:", req.body);
    console.log("url", req.url);
    console.log("query", req.query);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/examinations", examRoutes);
app.use("/user-exam-mapping", userExamMappingRoutes);


app.post("/checkout", async (req, res, next) => {
    console.log('payment body', req.body.info)
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: req.body.name + '#' + req.body.id + '#' + req.body.examId,
                        },
                        unit_amount: req.body.fees
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: `http://localhost:4200/examination/details/${req.body.examId}/registration/successful`,
            cancel_url: `http://localhost:3000/cancel.html`,
        });
        res.status(200).json(session);
    } catch (error ){
        next(error)
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log("server is running on port: ", process.env.PORT);
});
