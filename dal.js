const fs = require('fs')
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let letters = getLettersObj;


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
  return wordArray;
}

function getLettersObj(arr) {
  arr = getWordArray();
  let letterObj = {};
  let lettersArr = [];
  for (let i = 0; i < arr.length; i++) {
    letterObj.id = i;
    letterObj.letter = arr[i];
    letterObj.guessed = false;
    letterObj.placeholder = "_";
    lettersArr.push(letterObj);
    letterObj = {};
  }
  return lettersArr;
}

function guessLetter (letter) {
  let chosenLetter = letter;
  let lettersArr = letters;
  for (let i = 0; i < lettersArr.length; i++) {
    if (lettersArr[i].letter == chosenLetter) {
      lettersArr[i].guessed = true;
    };
  }
  return lettersArr;
}

module.exports = {
  words: words,
  getWords: getWords,
  getRandomIndex: getRandomIndex,
  getRandomWord: getRandomWord,
  getWordArray: getWordArray,
  getLettersObj: getLettersObj
}
