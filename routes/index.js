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
   let username = req.body.username
   let password = req.body.password
   if (!username || !password){
      res.render ('index', {error: 'fill it all in you dingus'})
   } else {
      knex('users')
         .where('username', username)
         .first()
         .then((user) => {
            if (!user) {
               res.render('index', {error: 'you dont exist!!!!! panic.'})
            } else {
               console.log('user', user);
               res.render('index')
            }
         })
   }
})


module.exports = router;
