const main = document.querySelector("main");
const timerHTML = document.querySelector("#timer p");
const resetIcon = document.querySelector("#timer i");
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
  timerHTML.innerHTML = `<span>${seconds}</span>.${
    centiseconds < 10 ? 0 : ""
  }${centiseconds}`;
  timerTimeout = setTimeout(timer, 10);
}

function startTimer() {
  timer();
  timerStarted = true;
  resetIcon.style.display = "none";
}

function stopTimer() {
  clearTimeout(timerTimeout);
  timerStarted = false;
  resetIcon.style.display = "block";
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
  timerHTML.innerHTML = `<span>${seconds}</span>.${
    centiseconds < 10 ? 0 : ""
  }${centiseconds}`;
  resetIcon.style.display = "none";
}

main.addEventListener("click", () => {
  seconds !== 0 && centiseconds !== 0 && !timerStarted
    ? resetTimer()
    : startStopTimer();
});

resetIcon.addEventListener("click", (e) => {
  resetTimer();
  e.stopPropagation();
});
