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
   let title = req.body.title
   let userID = req.cookies.userID
   console.log('userid', userID);
   //knex to add deck
   knex('decks')
      .returning(['id', 'name', 'user_id'])
      .insert({
        'name': title,
        'user_id': userID
      })
      .then((data) => {
         console.log('daaata', data);
         res.render('create')
      })

   //knex to add card
   for (let card in req.body.front){
      console.log(req.body.front[card]);
      console.log(req.body.back[card]);
   }
   // let card  = {req.body.front[1]: req.body.back[1]}
   // console.log('card obj', card);
   // knex('cards')


})

module.exports = router;
