const express = require('express');
const errorMiddleware = require("./middleware/error.middleware");
const app = express();
app.use(express.json());


const userRoutes = require("./routes/user.route");
app.use('/api/users', userRoutes);

app.get('/', (req, res)=>{
    res.send("Backend is running")
})

const courseRoutes = require("./routes/course.routes");
app.use("/api/courses", courseRoutes);

app.use(errorMiddleware);
module.exports = app;
