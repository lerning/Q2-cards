const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');

router.get('/', (req, res, next) => {
    jwt.verify(req.cookies.token, 'secret_key', (err, decoded) => {
      if (decoded) {
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
    } else {
      res.redirect('/?unauthorized=true')
    }
  })

  router.get('/:id', (req, res, next) => {
    jwt.verify(req.cookies.token, 'secret_key', (err, decoded) => {
      if (decoded) {
        let deck_id = req.params.id
        knex('cards')
        .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it ')
        .join('decks', 'decks.id', 'cards.deck_id')
        .where('decks.id', deck_id)
        .then((data) => {
          res.render(`decks`, {
            deck: data
          })
        })
      } else {
        res.redirect('/?unauthorized=true')
      }
    })
  })

});

router.put('/', (req, res, next) => {
  console.log('we were here');
  res.status(200).send(true);
})


router.delete('/', (req, res) => {
  let id = req.body.id;
  knex('decks')
    .where('id', id)
    .first()
    .del()
    .then(() => {
      res.status(200).send(true);
    })
})


module.exports = router;
