let words = [];
let currentWordIndex = 0;
let isPlaying = false;
let intervalId;

function spritz() {
  const text = document.getElementById('input-text').value;
  words = text.split(/\s+/);
  currentWordIndex = 0;
  updateDisplay();
}

function updateDisplay() {
  if (currentWordIndex >= words.length) {
    stopSpritz();
    return;
  }

  const word = words[currentWordIndex];
  const pivotIndex = getPivotIndex(word);
  const spritzdisplay = document.getElementById('spritz-display');

  spritzdisplay.innerHTML = `
        <span class="spritz-start">${word.slice(0, pivotIndex)}</span>
        <span class="spritz-pivot">${word[pivotIndex]}</span>
        <span class="spritz-end">${word.slice(pivotIndex + 1)}</span>
    `;

  currentWordIndex++;
}

function getPivotIndex(word) {
  if (word.length <= 1) return 0;
  if (word.length <= 5) return 1;
  if (word.length <= 9) return 2;
  if (word.length <= 13) return 3;
  return 4;
}

function toggleSpritz() {
  if (isPlaying) {
    stopSpritz();
  } else {
    startSpritz();
  }
}

function startSpritz() {
  isPlaying = true;
  document.getElementById('spritz-toggle').textContent = 'Pause';
  const wpm = parseInt(document.getElementById('wpm-selector').value);
  const msPerWord = 60000 / wpm;
  intervalId = setInterval(updateDisplay, msPerWord);
}

function stopSpritz() {
  isPlaying = false;
  document.getElementById('spritz-toggle').textContent = 'Start';
  clearInterval(intervalId);
}

document
  .getElementById('spritz-toggle')
  .addEventListener('click', toggleSpritz);
document.getElementById('input-text').addEventListener('input', spritz);
