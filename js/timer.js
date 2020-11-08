const main = document.querySelector("main");
const timerHTML = document.querySelector("#timer");
let seconds = 0;
let centiseconds = 0;

function timer() {
  centiseconds++;
  if (centiseconds === 100) {
    seconds++;
    centiseconds = 0;
  }
  timerHTML.innerHTML = `<span>${seconds}</span>.${
    centiseconds < 10 ? 0 : ""
  }${centiseconds}`;
  setTimeout(timer, 10);
}

main.addEventListener("click", timer);
