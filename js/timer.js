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

function startStopTimer() {
  if (!timerStarted) {
    timer();
    timerStarted = true;
  } else {
    clearTimeout(timerTimeout);
    timerStarted = false;
  }
}

timerHTML.addEventListener("click", startStopTimer);