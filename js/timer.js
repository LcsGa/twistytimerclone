const main = document.querySelector("main");
const timerHTML = document.querySelector("#timer");
let seconds = 0;
let centiseconds = 0;
let timerTimeout;
let timerStarted = false;

function timer() {
  centiseconds++;
  if (centiseconds === 100) {
    seconds++;
    centiseconds = 0;
  }
  timerHTML.innerHTML = `<p><span>${seconds}</span>.${
    centiseconds < 10 ? 0 : ""
  }${centiseconds}</p>`;
  timerTimeout = setTimeout(timer, 10);
}

function startTimer() {
  timer();
  timerStarted = true;
}

function stopTimer() {
  clearTimeout(timerTimeout);
  timerStarted = false;
}

function startStopTimer() {
  if (!timerStarted) {
    startTimer();
  } else {
    stopTimer();
  }
}

export function resetTimer() {
  stopTimer();
  seconds = 0;
  centiseconds = 0;
  timerHTML.innerHTML = `<p><span>${seconds}</span>.${
    centiseconds < 10 ? 0 : ""
  }${centiseconds}</p>`;
}

main.addEventListener("click", startStopTimer);
