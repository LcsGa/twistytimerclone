import { RubikCube } from "./RubikCube.js";
import "./timer.js";
import { resetTimer } from "./timer.js";

const combination = document.querySelector("#combination p");
const reloadBtn = document.querySelector(".fa-sync-alt");

let cube = new RubikCube();

function initCombination() {
  cube.applyChangesWithinCubeObject();
  cube.applyGraphicModifications();
  combination.innerHTML = cube.generatedCombination.join(" ");
}

initCombination();

reloadBtn.addEventListener("click", (e) => {
  cube = new RubikCube();
  initCombination();
  resetTimer();
  e.stopPropagation();
});
