const Category = require("../models/Category")

module.exports = {
    create : (req,res) =>{
        Category.create({
            name:req.body.name
        })
        .then((result) => res.json(result))
        .catch((err) => {
                throw(err)
        })
    },

    getAllCategory : (req,res) => {
        Category.find({})
        .then((result) => res.json(result))
        .catch((err) => {
            throw(err);
        })
    },
    getDatabyId: (req, res) => {
        Category.findById(req.params.categoryId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
    
      deleteById: (req, res) => {
        Category.findByIdAndRemove(req.params.categoryId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
      editById: (req, res) => {
        Category.findByIdAndUpdate(req.params.categoryId, {
            
            name: req.body.name,
            
        })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
}