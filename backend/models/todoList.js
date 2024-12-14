const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    item:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required: true
    }
});
const todoList = mongoose.model('todoList', todoSchema);
module.exports = todoList;
