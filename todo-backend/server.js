const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors  = require("cors");

app.use(cors());
app.use(express.json())
mongoose.set("strictQuery", false);

dotenv.config();

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected");
    } catch (error) {
        console.log(error)
    }
}
const todosRouter = require("./router/TodosRouter")

const port = process.env.PORT 
app.listen(port, () => {
    connect();
    console.log(`${port} dinleniyor...`)
})

app.get("/", (req, res) => res.send("Hello"));
app.use("/api/todo", todosRouter);