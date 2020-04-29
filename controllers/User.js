const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
privateKey = "sony456"

const validateUserInput = require('../validatior/User')
const validatorLoginInput = require('../validatior/User')

module.exports = {
    create: function (req, res, next) {
        User.create({
          email: req.body.email,
          name : req.body.name,
          phone : req.body.phone,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        })
        .then((response) => {
          if(req.body.password !== req.body.confirmPassword){
            res.send("your confirm pasword is not match with your password please try again")
          }else(
            res.json(response)
          )
        })    
          .catch ((err) => {
            throw err
          })
          // .then((response) => res.json(response))
          // .catch((err) => {
          //   throw err;
          // });
      },
    
      authenticated: function (req, res, next) {
        User.findOne({
          email: req.body.email,
          name : req.body.name,
          phone : req.body.phone,
        })
          .then((response, err) => {
            if (err) next(err);
            else {
              if (
                response != null &&
                bcrypt.compareSync(req.body.password, response.password)
              ) {
                jwt.sign(
                  {
                    id: response._id,
                  },
                  privateKey,
                  { expiresIn: 60 * 60 },
                  (err, token) => {
                    res.json(token);
                  }
                );
              } else {
                res.json({ status: err });
              }
            }
          })
          .catch((err) => {
            throw err;
          });
      },
    
    
      getData: (req, res, next) => {
        User.find({})
          .then((result) => {
            res.json({ status: "success", data: result });
          })
          .catch((err) => err);
      },
    
      getDatabyId: (req, res) => {
        User.findById(req.params.userId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
    
      deleteById: (req, res) => {
        User.findByIdAndRemove(req.params.userId)
          .then((result) => res.json(result))
          .catch((err) => res.json(err));
      },
    
    register : ((req,res,next) => {
      const {error,isValid} = validateUserInput(req.body)
      if(!isValid){
        return res
          .status(400)
          .json(error)
      }
      User.findOne({email : req.body.email})
      .then(user => {
        if(user){
          return res
            .status(400)
            .json({email : "email is alredy exsist"})
        }else {
          const newUser =  new User ({name : req.body.name,email : req.body.email, phone: req.body.phone,password : req.body.password,})
          bcrypt.genSalt(10,(err,salt) => {
            bcrypt.hash(newUser.password,salt,(err,hash) =>{
              if(err)
                throw(err)

                newUser.password = hash
                newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err))
            })
          })
        }
      })

    }),
    
    login: ((req, res, next) => {
      const {errors, isValid} = validateLoginInput(req.body);
      // Check validation
      if (!isValid) {
          return res
              .status(400)
              .json(errors);
      }
      const email = req.body.email;
      const password = req.body.password;
      // Find user by email
      User
          .findOne({email})
          .then(user => {
              // Check if user exists
              if (!user) {
                  return res
                      .status(404)
                      .json({emailnotfound: "Email not found"});
              }
              
              bcrypt
                  .compare(password, user.password)
                  .then(isMatch => {
                      if (isMatch) {
                          
                          const payload = {
                              id: user.id,
                              name: user.name
                          };
                          
                          jwt.sign(payload, process.env.SECRET_KEY, {
                              expiresIn: 31556926 // 1 year in seconds
                          }, (err, token) => {
                              res.json({
                                  success: true,
                                  token: "Bearer " + token,
                                  id: user.id
                              });
                          });
                      } else {
                          return res
                              .status(400)
                              .json({passwordincorrect: "Password incorrect"})
                      }
                  })
          })
  })
    
    };