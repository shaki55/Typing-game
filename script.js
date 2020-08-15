const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#pop-up');
const settingsBtn = document.querySelector('#settings-btn');
const settings = document.querySelector('settings');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#level');

// List of words for game
const words = [
  'sorrow',
  'tense',
  'airplane',
  'messi',
  'pies',
  'protests',
  'supernova',
  'bartender',
  'shell',
  'intelligent',
  'restaurent',
  'silverarrow',
  'hyperloop',
  'supernatural',
  'quacker',
  'elite',
  'fox',
  'bravo',
  'brooklyn',
  'america'
];


let randomWord;
let score = 0;
let time = 15;

// refreshing local storage to previous or medium by default
let level =
  localStorage.getItem('level') !== null
    ? localStorage.getItem('level')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('level') !== null
    ? localStorage.getItem('level')
    : 'medium';

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreDisplay.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeDisplay.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  message.innerHTML = `
    <h1>Times Up..!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Play Again</button>
  `;

  message.style.display = 'flex';
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    if (level === 'hard') {
      time += 3;
    } else if (level === 'medium') {
      time += 5;
    } else {
      time += 8;
    }

    updateTime();
  }
  
});

// Settings btn click
// settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  level = e.target.value;
  console.log(e.target.value);
  localStorage.setItem('level', level);
});

