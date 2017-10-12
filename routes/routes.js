const express = require('express')
const app = express();
const router = express.Router()
const dal = require('../dal')
const session = require('express-session')
const fs = require('fs')
const bodyParser = require('body-parser')
const validator = require('express-validator')

router
  .route('/')
  .get(function (req, res) {
    app.use(function (req, res, next) {
      if (req.session) {
        req.isAuthenticated = true;
      }
      else {
        req.isAuthenticated = false;
      }
      next();
    })
    if (req.isAuthenticated) {
      res.send('playing!')
  }
    else
      res.render('start')
  })

  .post(function (req, res) {
    const word = dal.getRandomWord();
    const session = req.session;
    wordArr = dal.getLettersObj(word)
    session.letters = [];
    session.word = word
    session.wordArr = wordArr
    session.guessCount = 8;
    res.redirect('/game')
  })

  router
    .route('/auth')
    .post(function (req, res) {
      const session = req.session;
      res.redirect('/')
    })

  router
    .route('/game')
    .get(function (req, res) {
      const wordArr = req.session.wordArr;
      console.log('session letters', req.session.letters)
      res.render('game', {wordArr: wordArr, letters: req.session.letters, guesses: req.session.guessCount})
    })
    .post(function (req, res) {
      if (req.session.guessCount <= 1) {
        console.log('boooooo')
        res.redirect('/loser')
      }
      const guess = req.body.letter;
      let wordArr = req.session.wordArr;
      let guessObj = dal.guessLetter(guess, wordArr, req.session.guessCount);
      let compArr = guessObj.compArr;
      wordArr = compArr;
      if (guessObj.guessArr) {
        req.session.letters.push(guessObj.guessArr);
      }
      req.session.guessCount = guessObj.count;
      res.redirect('/game')
      // if (compArr === wordArr) {
      //   wordArr = compArr;
      //   res.redirect('/game')
      }
    )

    router
      .route('/loser')
      .get(function (req, res) {
        res.render('loser')
      })

module.exports = router
