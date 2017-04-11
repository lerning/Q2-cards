const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const request = require('request')

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

router.get('/sample', (req, res, next) => {
  if (req.query.search !== undefined) {
    let deck_id = 0
    let url = ''
    const deck = []
    let optionsI = {
      url: `https://api.quizlet.com/2.0/search/sets?client_id=qQGwH7rCeg&whitespace=1&q=${req.query.search}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    function callbackI(error, response, body) {
      if (!error && response.statusCode == 200) {
        let info = JSON.parse(body);
        deck_id = info.sets[0].id
        url = `https://api.quizlet.com/2.0/sets/${deck_id}?client_id=qQGwH7rCeg&whitespace=1`
        request(options, callback)
      }
    }


    let options = {
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    function callback(error, response, body) {
      console.log('url', url);
      if (!error && response.statusCode == 200) {
        let info = JSON.parse(body);
        console.log('bdy', body);
        let terms = info.terms
        for (let i = 0; i < terms.length; i++) {
          deck.push({
            front: terms[i].term,
            back: terms[i].definition
          })
        }
        res.render('decks', {
          deck: deck
        })
      } else {
        console.log('error', error);
        res.end()
      }
    }
    request(optionsI, callbackI)


  } else {
    console.log('else');
    res.render('decks')
  }

})


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
