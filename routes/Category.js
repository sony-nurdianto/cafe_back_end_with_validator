const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/Category')


router.post("/create",categoryController.create)
router.get("/show",categoryController.getAllCategory)
router.get("/show/:categoryId",categoryController.getDatabyId)
router.delete("/del/:categoryId",categoryController.deleteById)
router.put("/edit/:categoryId",categoryController.editById)


module.exports = router