const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');


router.get('/', (req, res, next) => {
  let userID = req.cookies.userID
  console.log(userID);
  knex('users')
    .join('decks', 'decks.user_id', 'users.id')
    .select('decks.id as deck_id', 'decks.name as deck_title')
    .where('users.id', userID)
    .then((decks) => {
      res.render('decks', {
        decks: decks
      })
    })
});

router.get('/:id', (req, res, next) => {
  console.log('hi there!');
  let deck_id = req.body.deck_id
  console.log(deck_id);
  knex('cards')
    .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it ')
    .join('decks', 'decks.id', 'cards.deck_id')
    .where('decks.id', deck_id)
    .then((data) => {
        res.status(200).send(true)
    })
})

module.exports = router;

// function deckAndUser (userID) {
//   return knex('users')
//     .join('decks', 'decks.user_id', 'users.id')
//     .select('decks.id as deck_id', 'decks.name as deck_title')
//     .where('users.id', userID)
//     .then((decks) => {
//       return decks
//     })
// }
//
// function decksAndCards(decks) {
//   return Promise.all(decks.map((deck) => {
//     return knex('cards')
//       .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it')
//       .join('decks', 'decks.id', 'cards.deck_id')
//       .where('decks.id', deck.deck_id)
//       .then((data) => {
//         console.log(data);
//         deck.card = data
//         return deck
//       })
//   }))
// }
//
// function wholeDeck(userID) {
//   return deckAndUser(userID)
//     .then(decksAndCards)
// }
