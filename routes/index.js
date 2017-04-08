const express = require('express');
const router = express.Router();
const knex = require('../knex')

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('users')
    .then((users) => {

      res.render('index', { title: 'Express' });
    })
});


module.exports = router;
