const MenuSchema = require("../models/Menu")

module.exports ={
    create : (req,res) => {
        MenuSchema.create({
            name: req.body.name,
            detail : req.body.detail,
            price : req.body.price,
            category: req.body.category,
            imgUrl : req.file && req.file.path
        })
        .then((response) => res.json(response))
        .catch((err) => {
            throw(err)
        })
    },

    getAllData: (req,res) => {
        MenuSchema.find({})
        .populate("category")
        .then((response) => res.json(response))
        .catch((err) => err)
    },
    getDatabyId: (req, res) => {
        MenuSchema.findById(req.params.menuId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
    
      deleteById: (req, res) => {
        MenuSchema.findByIdAndRemove(req.params.menuId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
      editById: (req, res) => {
        MenuSchema.findByIdAndUpdate(req.params.menuId, {
            
            name: req.body.name,
            detail : req.body.detail,
            price : req.body.price,
            category: req.body.category,
            imgUrl : req.file && req.file.path
            
        })
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
}