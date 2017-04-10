const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const ev = require('express-validations')
const validations = require('../validations/cards')
const validationsII = require('../validations/decks')

router.get('/', (req, res) => {
  jwt.verify(req.cookies.token, "secret_key", (err, decoded) => {
    if (decoded) {
      res.render('create')
    } else {
      res.redirect('/?unauthorized=true')
    }
  })
})

router.post('/', ev('validations.post'), ev('validationsII.post') (req, res) => {
   let title = req.body.title
   let userID = req.cookies.userID
   //knex to add deck
   function createDeck() {
      return knex('decks')
               .returning(['id', 'name', 'user_id'])
               .insert({ 'name': title, 'user_id': userID })
               .then((deck) => {
                  console.log('daaata', deck[0]);
                  return deck[0]
               })
   }
   // knex to add card
   function createCard(deck) {
      for (let card in req.body.front){
        knex('cards')
            .returning(['id', 'front', 'back', 'deck_id', 'got_it'])
            .insert({
               'front': req.body.front[card],
               'back': req.body.back[card],
               'deck_id':deck.id,
               'got_it': false
            })
            .then((card) => {
               return card
            })
         }
   }
   function createDeckandCards() {
     return createDeck()
       .then(createCard)
   }
   createDeckandCards()
   .then(() => {
      res.redirect('decks')
   })

})

module.exports = router;
