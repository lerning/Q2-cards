const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
   res.render('create')
})

router.post('/', (req, res) => {
   console.log('body', req.body);
   console.log(' front reqbody [1]', req.body.front[1]);
   console.log(' back reqbody [1]', req.body.back[1]);
   //knex to add deck




   //knex to add card
   for (let card in req.body.front){
      console.log(req.body.front[card]);
      console.log(req.body.back[card]);
   }
   // let card  = {req.body.front[1]: req.body.back[1]}
   // console.log('card obj', card);
   // knex('cards')

   res.render('create')

})

module.exports = router;
