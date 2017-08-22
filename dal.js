const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

function getWords() {
  return words;
}

function getRandomIndex(min, max) {
  let words = getWords();
  min = 0;
  max = words.length;
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomWord (words) {
  words = getWords();
  let word = '';
  word = words[getRandomIndex()];
  return word;
}

function getWordArray(randomWord) {
  randomWord = getRandomWord();
  let wordArray = [];
  wordArray = randomWord.split('');
  return wordArray
}

module.exports = {
  words: words,
  getWords: getWords,
  getRandomIndex: getRandomIndex,
  getRandomWord: getRandomWord,
  getWordArray: getWordArray
}
