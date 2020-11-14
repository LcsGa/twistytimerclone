import { RubikCube } from "./RubikCube.js";
import "./timer.js";
import { resetTimer } from "./timer.js";
import "./style/mobile_viewport_height.js";
import "./personalizedCombination.js";
import {
  buttons,
  input,
  onDialogButtonClicked,
} from "./personalizedCombination.js";

// Variables___________________________________________________________________
const combination = document.querySelector("#combination p");
const reloadBtn = document.querySelector(".fa-sync-alt");
let cube = new RubikCube();

// Init function_______________________________________________________________
function initCombination(personnalizedCombination = false) {
  cube = new RubikCube();
  if (!personnalizedCombination) {
    cube.generateTextualCombination();
  } else {
    combination.innerHTML = input.value.toUpperCase();
    cube.generatedCombination = combination.innerHTML.split(" ");
  }
  cube.applyChangesWithinCubeObject();
  cube.applyGraphicModifications();
  combination.innerHTML = cube.generatedCombination.join(" ");
}

initCombination();

// Event listeners_____________________________________________________________
reloadBtn.addEventListener("click", (e) => {
  initCombination();
  resetTimer();
  e.stopPropagation();
});

buttons.done.addEventListener("click", (e) => {
  if (input.value !== "") {
    initCombination(true);
    resetTimer();
  }
  e.stopPropagation();
  onDialogButtonClicked(e);
});
