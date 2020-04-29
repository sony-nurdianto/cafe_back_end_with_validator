const mongoose =  require('mongoose')
const Schema = mongoose.Schema


const newCategorySchema =  new Schema ({
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("category",newCategorySchema)