const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require("./Category")


const newMenuSchema = new Schema ({

    name : {
        type : String,
        required : true
    },
    detail : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : String
    },
    category: {
        type : Schema.Types.ObjectId,
        ref : Category
    },
    imgUrl: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model("menu",newMenuSchema)