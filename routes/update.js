const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const ev = require('express-validation')


router.get('/:id', (req, res) => {
  let deck_id = req.params.id
  console.log('deck id', deck_id);
  jwt.verify(req.cookies.token, "secret_key", (err, decoded) => {
    if (decoded) {
      knex('cards')
        .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it ', 'decks.name as title', 'cards.id as id')
        .join('decks', 'decks.id', 'cards.deck_id')
        .where('decks.id', deck_id)
        .then((data) => {
          res.render(`update`, {
            title: data[0].title,
            deck: data
          })
        })
    } else {
      res.redirect('/?unauthorized=true')
    }
  })
})

router.post('/:id', (req, res) => {
  let title = req.body.title
  let userID = req.cookies.userID
  let deck_id = +req.params.id
  console.log('reeeeq', req.body);
  //knex to update deck

  knex('decks')
    .returning(['id', 'name', 'user_id'])
    .where('decks.id', deck_id)
    .update({
      'name': title
    })
    .then(() => {
      for (let card in req.body.front) {
        knex('cards')
          .returning(['id', 'front', 'back'])
          .where('id', +req.body.id[card])
          .update({
            'front': req.body.front[card],
            'back': req.body.back[card]
          })
          .then((data) => {
            console.log('cardy',data[0]);
          })
      }
    })
    .then (() => {
      res.redirect('/decks')
    })





})



module.exports = router;
