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
})


router.get('/sample', (req, res, next) => {
  const deck = []
    if (req.query.search !== undefined) {
        let deck_id = 0
        const decks = []
        let optionsI = {
            url: `https://api.quizlet.com/2.0/search/sets?client_id=qQGwH7rCeg&whitespace=1&q=${req.query.search}`,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        function callbackI(error, response, body) {
            if (!error && response.statusCode == 200) {
                let info = JSON.parse(body);
                for (var i = 0; i < 3; i++) {
                  deck_id = info.sets[i].id
                  title = info.sets[i].title + ' ' + (i + 1)
                  decks.push({
                    id: deck_id,
                    title: title
                  })
                }
            }
            res.render('decks', {
              sampleDecks: decks
            })
        }
        request(optionsI, callbackI)
    } else {
        res.render('decks', {
            search: [1]
        })
    }
})

router.get('/sample/:id', (req, res, next) => {
  let cards = []
  let deck_id = req.params.id
  let options = {
      url: `https://api.quizlet.com/2.0/sets/${deck_id}?client_id=qQGwH7rCeg&whitespace=1`,
      headers: {
          'Content-Type': 'application/json'
      }
  }
  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          let terms = info.terms
          for (let i = 0; i < terms.length; i++) {
              cards.push({
                  front: terms[i].term,
                  back: terms[i].definition
              })
          }
          console.log('cards', cards);
          let firstCard = [cards[0]]
          cards.shift()
          res.render(`decks`, {
             deck: cards,
             cardOne: firstCard
          })
      } else {
          res.end()
      }
  }
  request(options, callback)
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
            let firstCard = [data[0]]
            data.shift()
            res.render(`decks`, {
               deck: data,
               cardOne: firstCard
            })
         })
      } else {
         console.log('we got you you bastard!');
         res.redirect('/?unauthorized=true')
      }
   })
})


router.put('/', (req, res, next) => {
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
