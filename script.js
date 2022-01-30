'use strict';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayBody = function (style) {
  document.querySelector('body').style.backgroundColor = style;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const displayGuess = function (guess) {
  if (!guess) {
    return document.querySelector('.guess').value;
  } else {
    return (document.querySelector('.guess').value = guess);
  }
};

const drawSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = drawSecretNumber();
let score = 20;
let hightScore = 0;

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = drawSecretNumber();
  displayBody('#222');
  document.querySelector('.number').style.width = '15rem';
  displayScore(score);
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  displayGuess(' ');
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(displayGuess());
  console.log(typeof guess, guess);

  // WHEN INPUT IS EMPTY
  if (!guess) {
    displayMessage('Choose a number');

    // WHEN GUESS NUMBER === SECRET NUMBER
  } else if (guess === secretNumber) {
    displayMessage('You won 🏆');
    document.querySelector('.number').style.width = '30rem';
    displayBody('#0a0');
    document.querySelector('.number').textContent = secretNumber;

    if (score > hightScore) {
      hightScore = score;
      document.querySelector('.highscore').textContent = hightScore;
    }

    // WHEN GUESS NUMBER IS OTHER THAN SECRET
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈Too hight' : '📉Too low');
      score--;
      displayScore(score);
    } else {
      displayMessage('💥You lose a game');
      score = 0;
      displayScore(score);
    }
  }
});
