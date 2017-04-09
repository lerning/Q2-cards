const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

router.get('/:id', (req, res, next) => {
  let deck_id = req.params.id
  console.log('params', req.params);
  console.log('query', req.query);
  knex('cards')
    .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it ')
    .join('decks', 'decks.id', 'cards.deck_id')
    .where('decks.id', deck_id)
    .then((data) => {
        res.render(`decks`, {
          deck: data
        })
    })
})

router.get('/', (req, res, next) => {
  if (req.params.id) {
    res.status(200).send(true)
  } else {
    let userID = req.cookies.userID
    knex('users')
      .join('decks', 'decks.user_id', 'users.id')
      .select('decks.id as deck_id', 'decks.name as deck_title')
      .where('users.id', userID)
      .then((decks) => {
        res.render('decks', {
          decks: decks
        })
      })
  }


});



module.exports = router;
