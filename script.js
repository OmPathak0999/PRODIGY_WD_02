let startTime, interval;
let elapsedTime = 0;
let running = false;

const display = document.getElementById('time');
const lapsList = document.getElementById('laps');

function updateDisplay(time) {
  const ms = Math.floor(time % 1000);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / (1000 * 60)) % 60);
  const h = Math.floor((time / (1000 * 60 * 60)));

  display.textContent = 
    `${String(h).padStart(2, '0')}:` +
    `${String(m).padStart(2, '0')}:` +
    `${String(s).padStart(2, '0')}.` +
    `${String(ms).padStart(3, '0')}`;
}

function startStopwatch() {
  if (running) return;
  running = true;
  startTime = Date.now() - elapsedTime;
  interval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
  }, 10);
}

function pauseStopwatch() {
  if (!running) return;
  running = false;
  clearInterval(interval);
}

function resetStopwatch() {
  running = false;
  clearInterval(interval);
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  lapsList.innerHTML = '';
}

function addLap() {
  if (!running) return;
  const li = document.createElement('li');
  li.textContent = display.textContent;
  lapsList.appendChild(li);
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', addLap);
