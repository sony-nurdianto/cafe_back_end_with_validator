const express = require('express');
const router = express.Router();
const userController = require('../controllers/User')

router.post('/post',userController.create)
router.post('/login',userController.authenticated)
router.get('/get',userController.getData)
router.get('/getDataById/:userId',userController.getDatabyId)
router.delete('/del/:userId',userController.deleteById)

router.post('/register',userController.register)
router.post('/masuk',userController.login)

module.exports = router