const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const knex = require('../knex')
const jwt = require('jsonwebtoken')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.clearCookie('token')
  res.clearCookie('userID')
  if (req.query.unauthorized) {
    res.render('index', {
      error: 'Unauthorized: please login.'
    })
  } else {
    res.render('index')
  }
})

router.post('/', (req, res) => {
  if (req.body.accessToken) {
  let fbEmail = req.body.email
  let fbToken = req.body.accessToken;
  console.log('req.body is', req.body);
  knex("users")
    .where("username", fbEmail)
    .then((exists) => {
      // THis is if the user already exists
      if (exists.length > 0) {
        knex("users")
          .where('username', fbEmail)
          .first()
          .then((user) => {
            let token = jwt.sign({
              user: user
            }, 'secret_key')
            res.cookie('token', token)
            res.cookie('userID', user.id, {
              httpOnly: true
            })
            res.redirect('/decks')

            // This is if the user doesn't exist
          })
      } else {
        console.log('no exist')
        knex("users")
          .returning(['id', 'username', 'hashed_password',
            'email'
          ])
          .insert({
            'username': fbEmail,
            'hashed_password': bcrypt.hashSync(fbToken, 10),
            'email': fbEmail
          })
          .then((user) => {
            console.log('user0 is', user[0].username);
            let token = jwt.sign({
              username: user[0].username,
              password: user[0].hashed_password
            }, 'secret_key')
            res.cookie('token', token, {
              httpOnly: true
            })
            res.cookie('userID', user[0].id, {
              httpOnly: true
            })
            console.log('token POPOPOPOPOPOPOPO', token);
            res.redirect('/decks');
          })
      }
    })
  } else {


  let username = req.body.username.toLowerCase();

  let password = req.body.password
  if (!username || !password) {
    res.render('index', {
      error: 'fill it all in you dingus'
    })
  } else {
    knex('users')
      .where('username', username)
      .first()
      .then((user) => {
        if (!user) {
          res.render('index', {
            error: 'you dont exist!!!!! panic.'
          })
        } else {
          let hashed_password = bcrypt.compare(password, user.hashed_password, (err, result) => {
            if (result) {
              let token = jwt.sign({
                user: user
              }, 'secret_key')
              res.cookie('token', token)
              res.cookie('userID', user.id, {
                httpOnly: true
              })
              res.redirect('/decks')
            } else {
              res.render('index', {
                error: 'incorrect password you jabrone'
              })
            }
          })
        }
      })
    }
   }

})

router.get('/sample', (req, res) => {
  console.log('in sample on index.js');
  res.end()
})


module.exports = router;
