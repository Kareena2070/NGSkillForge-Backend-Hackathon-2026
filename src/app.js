const express = require('express');
const errorMiddleware = require("./middleware/error.middleware");
const app = express();
app.use(express.json());


const userRoutes = require("./routes/user.route");
app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send("Backend is running")
})

// const courseRoutes = require("./routes/course.routes");
// app.use("/api/courses", courseRoutes);

const authRoutes = require("./modules/auth/auth.routes");
app.use("/api/auth", authRoutes);

const courseRoutes = require("./modules/course/course.routes");
app.use("/api/courses", courseRoutes);

const enrollmentRoutes = require("./modules/enrollment/enrollment.routes");
app.use("/api/enrollments", enrollmentRoutes);

const progressRoutes = require("./modules/progress/progress.routes");
app.use("/api/progress", progressRoutes);

const path = require("path");
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "../uploads")
    )
);


app.use(errorMiddleware);
module.exports = app;
