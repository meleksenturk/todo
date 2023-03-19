const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
    {
        title:{type:String, require:true},
        desc:{type:String, require:true}
    },
    {timestamps:true}
)

const Todo = mongoose.model("todos", TodoSchema);
module.exports = Todo;