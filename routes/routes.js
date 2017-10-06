const express = require('express')
const app = express();
const router = express.Router()
const dal = require('../dal')
const session = require('express-session')
const fs = require('fs')
const bodyParser = require('body-parser')
const validator = require('express-validator')

//TO DO: I have the session working to store the word and word array. need to write function to check the chosen letter against the word array and reveal the letter if true; also need to include a guess counter in state (done) and write a function to return a lose alert and reset the session/log the user out on the last count (8? check the docs).

router
  .route('/')
  //middleware goes here for starting game: if user is 'logged in' (has chosen to play game), then render game page; if not, render start page
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
    session.word = word
    session.wordArr = wordArr
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
      res.render('game', {wordArr: wordArr})
    })
    .post(function (req, res) {
      const guess = req.body.letter;
      let wordArr = req.session.wordArr;
      let guessCount = req.session.guessCount;
      let compArr = dal.guessLetter(guess, wordArr);
      if (compArr === wordArr) {
        wordArr = compArr;
        console.log('you got it right!', wordArr)
        res.render('game', {wordArr: wordArr})
      }
      else {
        guessCount -= 1;
        console.log("crap, you got it wrong. you have ", guessCount, " guesses left.")
        res.render('game', {wordArr: wordArr})
      }
    }

    )

module.exports = router
