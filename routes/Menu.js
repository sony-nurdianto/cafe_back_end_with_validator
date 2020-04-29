const express = require("express")
const router = express.Router()
const MenuController = require("../controllers/Menu")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req,res,cb){
        cb(null,"./public/images")
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+file.originalname)
    },
})

const upload = multer({
    storage : storage
})

router.post('/create',upload.single("imgUrl"),MenuController.create)
router.get("/show",MenuController.getAllData);
router.get("/show/:menuId",MenuController.getDatabyId)
router.delete("/del/:menuId",MenuController.deleteById)
router.put("/edit/:menuId",MenuController.editById)


module.exports = router