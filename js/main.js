import { RubikCube } from "./RubikCube.js";
import "./timer.js";

const combination = document.querySelector("#combination p");
const reloadBtn = document.querySelector(".fa-sync-alt");

let cube = new RubikCube();
cube.applyGraphicModifications();

reloadBtn.addEventListener("click", () => {
  if (cube.generatedCombination !== undefined) {
    cube = new RubikCube();
  }
  cube.applyChangesWithinCubeObject();
  cube.applyGraphicModifications();
  combination.innerHTML = cube.generatedCombination.join(" ");
});
