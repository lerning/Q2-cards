const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const jwt = require('jsonwebtoken');
const request = require('request')

router.get('/', (req, res, next) => {
  let userID = +req.cookies.userID;
  jwt.verify(req.cookies.token, 'secret_key', (err, decoded) => {
    if (decoded) {
      if (req.params.id) {
        res.status(200).send(true);
      } else {
        if (userID === 1) {
          // as an admin you can view, edit, delete all decks
          knex('decks')
          .select('decks.id as deck_id', 'decks.name as deck_title')
          .then((decks) => {
            res.render('decks', {
              decks: decks,
              pageTitle: 'Welcome, Admin'
            })
          })
        } else {
          knex('users')
            .join('decks', 'decks.user_id', 'users.id')
            .select('decks.id as deck_id', 'decks.name as deck_title')
            .where('users.id', userID)
            .then((decks) => {
              res.render('decks', {
                decks: decks,
                pageTitle: 'Your Decks'
              })
            })
        }
      }
    } else {
      res.redirect('/login/?unauthorized=true')
    }
  })
})

router.get('/searchy', (req, res, next) => {
   console.log('were in there');
   res.status(200).send(true)
})

router.get('/sample/:search', (req, res, next) => {

   console.log('req params here', req.params.search);
   let search = (req.params.search)
   console.log('type', typeof search);
   if (search.match(/[a-zA-Z]/)) {
      const deck = []
      console.log('heyyy', req.params);
      let deck_id = 0
      const decks = []
      let optionsI = {
         url: `https://api.quizlet.com/2.0/search/sets?client_id=qQGwH7rCeg&whitespace=1&q=${search}`,
         headers: {
            'Content-Type': 'application/json'
         }
      }

      function callbackI(error, response, body) {
         if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            for (var i = 0; i < 4; i++) {

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

      let cards = []
      let deck_id = parseInt(search)
      console.log('deck id ', deck_id);
      let options = {
        url: `https://api.quizlet.com/2.0/sets/${deck_id}?client_id=qQGwH7rCeg&whitespace=1`,
        headers: {
          'Content-Type': 'application/json'
        }
      }

      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
          let info = JSON.parse(body);
          console.log('info', info);
          let terms = info.terms
          for (let i = 0; i < terms.length; i++) {
            cards.push({
              front: terms[i].term,
              back: terms[i].definition
            })
          }
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
   }

})

router.get('/sample/search/:id', (req, res, next) => {
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
        .select('cards.front as front', 'cards.back as back', 'cards.got_it as got_it', 'decks.name as title')
        .join('decks', 'decks.id', 'cards.deck_id')
        .where('decks.id', deck_id)
        .then((data) => {
          let title = data[0].title
          let firstCard = [data[0]]
          data.shift()
          console.log(title);
          res.render(`decks`, {
            deck: data,
            cardOne: firstCard,
            deckTitle: title
          })
        })
    } else {
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
