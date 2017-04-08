const express = require('express')
const router = express.Router()
const knex = require('../knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltrounds = 10

/* GET home page. */
router.get('/', (req, res, next) =>{
  res.render('signup')
});

router.post('/', (req, res, next) => {
  let username = req.body.username.toLowerCase()
  let password = req.body.password
  let email = req.body.email
  let confirm_password = req.body.confirm_password

  if (!username || !password || !email ){
     res.render ('signup', {error: 'fill it all in you dingus'})
  } else if (password != confirm_password) {
     res.render('signup', {error:"you done fudged (passwords don't match!)"})
  }
  else {
  knex('users')
      .where('username', username)
      .then((exists) => {
        if (exists.length > 0) {
          res.render('signup', {
            error: 'Username is already taken.'
          })
        } else {
          knex('users')
            .returning(['id', 'username', 'hashed_password', 'email'])
            .insert({
              username: username,
              hashed_password: bcrypt.hashSync(password, saltrounds),
              email: email
            }).then((user) => {
              let token = jwt.sign({ username: user[0].username, password: user[0].hashed_password }, 'shhhh')
              res.cookie('token', token, { httpOnly:true })
              res.cookie('userID', user[0].id, { httpOnly:true })
              res.redirect('/')
            })
        }
      })
   }
})

module.exports = router;
