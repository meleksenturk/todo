const Todo = require("../models/Todo");
const express = require("express");
const router = express.Router();


router.get("/get-all", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos)
        // res.status(200).json("succesfully");
    } catch (error) {
        console.log(error);
    }
})

router.post("/add-todo", async (req, res) => {

    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).json("succesfully")
    } catch (error) {
        console.log("error");
    }
})

router.put("/update-todo", async(req,res) => {
    try {
        await Todo.findOneAndUpdate({_id: req.body.todoId}, req.body);
        res.status(200).json("succesfully update")
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete-todo", async(req,res) => {
    try {
        await Todo.findOneAndDelete({_id: req.body._id})
        // res.status(200).json("succesfully delete")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;