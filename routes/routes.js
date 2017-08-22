const express = require('express')
const router = express.Router()
const dal = require('../dal')
const session = require('express-session')
const fs = require('fs')

router
  .route('/')
  .get(function (req, res) {
    console.log(dal.getWordArray())
    res.send('testing testing 123 :D')
  })

module.exports = router
