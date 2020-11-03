const combination = document.querySelector("#combination p");
const topFigure = document.querySelectorAll("#top .square");
const leftFigure = document.querySelectorAll("#left .square");
const frontFigure = document.querySelectorAll("#front .square");
const rightFigure = document.querySelectorAll("#right .square");
const backFigure = document.querySelectorAll("#back .square");
const bottomFigure = document.querySelectorAll("#bottom .square");
const reloadMix = document.querySelector(".fa-sync-alt");

class Cube {
  constructor() {
    this.cube = {
      top: [
        ["red", "red", "red"],
        ["red", "red", "red"],
        ["red", "red", "red"],
      ],
      left: [
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
      ],
      front: [
        ["white", "white", "white"],
        ["white", "white", "white"],
        ["white", "white", "white"],
      ],
      right: [
        ["green", "green", "green"],
        ["green", "green", "green"],
        ["green", "green", "green"],
      ],
      back: [
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
      ],
      bottom: [
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
      ],
    };
  }

  // generate the move with the side to be moved as an argument ; the direction randomly given or not ; the repetition given only if there is no direction settled and if the randomization is positive
  move(side) {
    // const direction = Math.floor(Math.random() * 2) > 0 ? "'" : "";
    // const repetition =
    // (!direction && Math.floor(Math.random() * 2)) > 0 ? "2" : "";
    this.generatedCombination.push(side /*+ direction + repetition*/);
  }

  generateCombination() {
    this.generatedCombination = [];
    for (let i = 0; i < Math.floor(18 + Math.random() * 6); i++) {
      switch (Math.floor(Math.random() * 6)) {
        case 0: {
          this.move("U");
          break;
        }
        case 1: {
          this.move("L");
          break;
        }
        case 2: {
          this.move("F");
          break;
        }
        case 3: {
          this.move("R");
          break;
        }
        case 4: {
          this.move("B");
          break;
        }
        case 5: {
          this.move("D");
          break;
        }
      }
    }
    this.changeGraphicCombination();
  }

  changeGraphicCombination() {
    for (const move of this.generatedCombination) {
      // const direction = move.contains("'") ? "-" : "+";
      // const repetition = move.contains("2") ?
      switch (move[0]) {
        case "U": {
          [
            this.cube.left[0],
            this.cube.front[0],
            this.cube.right[0],
            this.cube.back[0],
          ] = [
            this.cube.front[0],
            this.cube.right[0],
            this.cube.back[0],
            this.cube.left[0],
          ];
          break;
        }
        case "L": {
          [
            this.cube.top[0][0],
            this.cube.top[1][0],
            this.cube.top[2][0],
            this.cube.front[0][0],
            this.cube.front[1][0],
            this.cube.front[2][0],
            this.cube.bottom[0][0],
            this.cube.bottom[1][0],
            this.cube.bottom[2][0],
            this.cube.back[0][2],
            this.cube.back[1][2],
            this.cube.back[2][2],
          ] = [
            this.cube.back[2][2],
            this.cube.back[1][2],
            this.cube.back[0][2],
            this.cube.top[0][0],
            this.cube.top[1][0],
            this.cube.top[2][0],
            this.cube.front[0][0],
            this.cube.front[1][0],
            this.cube.front[2][0],
            this.cube.bottom[2][0],
            this.cube.bottom[1][0],
            this.cube.bottom[0][0],
          ];
          break;
        }
        case "F": {
          [
            this.cube.top[2][0],
            this.cube.top[2][1],
            this.cube.top[2][2],
            this.cube.left[0][2],
            this.cube.left[1][2],
            this.cube.left[2][2],
            this.cube.bottom[0][0],
            this.cube.bottom[0][1],
            this.cube.bottom[0][2],
            this.cube.right[0][0],
            this.cube.right[1][0],
            this.cube.right[2][0],
            this.cube.front[0][0],
            this.cube.front[0][1],
            this.cube.front[0][2],
            this.cube.front[1][2],
            this.cube.front[2][2],
            this.cube.front[2][1],
            this.cube.front[2][0],
            this.cube.front[1][0],
          ] = [
            this.cube.left[2][2],
            this.cube.left[1][2],
            this.cube.left[0][2],
            this.cube.bottom[0][0],
            this.cube.bottom[0][1],
            this.cube.bottom[0][2],
            this.cube.right[2][0],
            this.cube.right[1][0],
            this.cube.right[0][0],
            this.cube.top[2][0],
            this.cube.top[2][1],
            this.cube.top[2][2],
            this.cube.front[2][0],
            this.cube.front[1][0],
            this.cube.front[0][0],
            this.cube.front[0][1],
            this.cube.front[0][2],
            this.cube.front[1][2],
            this.cube.front[2][2],
            this.cube.front[2][1],
          ];
          break;
        }
        case "R": {
          [
            this.cube.top[0][2],
            this.cube.top[1][2],
            this.cube.top[2][2],
            this.cube.front[0][2],
            this.cube.front[1][2],
            this.cube.front[2][2],
            this.cube.bottom[0][2],
            this.cube.bottom[1][2],
            this.cube.bottom[2][2],
            this.cube.back[0][0],
            this.cube.back[1][0],
            this.cube.back[2][0],
          ] = [
            this.cube.front[0][2],
            this.cube.front[1][2],
            this.cube.front[2][2],
            this.cube.bottom[0][2],
            this.cube.bottom[1][2],
            this.cube.bottom[2][2],
            this.cube.back[2][0],
            this.cube.back[1][0],
            this.cube.back[0][0],
            this.cube.top[2][2],
            this.cube.top[1][2],
            this.cube.top[1][2],
          ];
          break;
        }
        case "B": {
          // [this.cube.top[0], getColumn(this.cube.left, 0)];
          [
            this.cube.top[0][0],
            this.cube.top[0][1],
            this.cube.top[0][2],
            this.cube.left[0][0],
            this.cube.left[1][0],
            this.cube.left[2][0],
            this.cube.bottom[2][0],
            this.cube.bottom[2][1],
            this.cube.bottom[2][2],
            this.cube.right[0][2],
            this.cube.right[1][2],
            this.cube.right[2][2],
            this.cube.back[0][2],
            this.cube.back[0][1],
            this.cube.back[0][0],
            this.cube.back[1][0],
            this.cube.back[2][0],
            this.cube.back[2][1],
            this.cube.back[2][2],
            this.cube.back[1][2],
          ] = [
            this.cube.right[0][2],
            this.cube.right[1][2],
            this.cube.right[2][2],
            this.cube.top[0][2],
            this.cube.top[0][1],
            this.cube.top[0][0],
            this.cube.left[0][0],
            this.cube.left[1][0],
            this.cube.left[2][0],
            this.cube.bottom[2][2],
            this.cube.bottom[2][1],
            this.cube.bottom[2][0],
            this.cube.back[2][2],
            this.cube.back[1][2],
            this.cube.back[0][2],
            this.cube.back[0][1],
            this.cube.back[0][0],
            this.cube.back[1][0],
            this.cube.back[2][0],
            this.cube.back[2][1],
          ];
          break;
        }
        case "D": {
          [
            this.cube.left[2],
            this.cube.front[2],
            this.cube.right[2],
            this.cube.back[2],
          ] = [
            this.cube.back[2],
            this.cube.left[2],
            this.cube.front[2],
            this.cube.right[2],
          ];
          break;
        }
      }
    }
    this.applyGraphicCombination();
  }

  applyFigureChanges(graphicFigure, classFigure) {
    let [line, column] = [0, 0];
    for (const square of graphicFigure) {
      square.classList.remove(square.classList[square.classList.length - 1]);
      square.classList.add(classFigure[line][column]);
      if (column === 2) {
        line++;
        column = 0;
      } else {
        column++;
      }
    }
  }

  applyGraphicCombination() {
    this.applyFigureChanges(topFigure, this.cube.top);
    this.applyFigureChanges(leftFigure, this.cube.left);
    this.applyFigureChanges(frontFigure, this.cube.front);
    this.applyFigureChanges(rightFigure, this.cube.right);
    this.applyFigureChanges(backFigure, this.cube.back);
    this.applyFigureChanges(bottomFigure, this.cube.bottom);
  }
}

const cube = new Cube();
window.onload = () => {
  cube.generateCombination();
  combination.innerHTML = cube.generatedCombination.join(" ");
};

reloadMix.addEventListener("click", () => {
  cube.generateCombination();
  combination.innerHTML = cube.generatedCombination.join(" ");
});
