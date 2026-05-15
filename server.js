require("dotenv").config();
const app = require('./src/app');

const connectDB = require('./src/config/db');

const Port = process.env.PORT
connectDB();

app.listen(Port, ()=>{
    console.log(`Server is running on the ${Port}`)
})