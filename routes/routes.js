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
    const word = dal.getLettersObj();
    res.render('game', { word: word })
  })

  router
    .route('/auth')
    .post(function (req, res) {
      const session = req.session;
      res.redirect('/')
    })

  router
    .route('/game')
    .post(function (req, res) {
      req.checkBody("letter", "Enter a letter!").isAlpha();
      console.log(req.body.letter);
      guessLetter(req.body.letter);
      res.render('game', {})
    })

    //middleware goes here for verification of letter format: if correct, next; if not, redirect and ask user to try again (using mustache partial: ^correct)
    //after verified, match submission to mystery word
    //display: if no matching letters, count = count - 1; else, array = array with matching letters replacing dashes

module.exports = router
