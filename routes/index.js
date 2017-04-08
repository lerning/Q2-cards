var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index');

  // knex('users')
  //   .then((users) => {
  //
  //   })
});

router.post('/', (req, res) => {
   let username = req.body.username.toLowerCase()
   let password = req.body.password
   if (!username || !password){
      res.render ('index', {error: 'fill it all in you dingus'})
   } else {
      knex('users')
         .where('username', username)
         .first()
         .then((user) => {
            if (!user) {
               console.log('!user', user);
               res.render('index', {error: 'you dont exist!!!!! panic.'})
            } else {
               console.log('user', user);
               let hashed_password = bcrypt.compare(password, user.hashed_password, (err, result) => {
                  if (result) {
                     let token = jwt.sign({user: user}, 'secret_key')
                     res.cookie('token', token)
                     res.render('index')
                  }else {
                     res.render('index', {error: 'incorrect password you jabrone'})
                  }
               })
            }
         })
   }
})


module.exports = router;
