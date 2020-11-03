const combination = document.querySelector("#combination p");
const topFigure = document.querySelectorAll("#top .square");
const leftFigure = document.querySelectorAll("#left .square");
const frontFigure = document.querySelectorAll("#front .square");
const rightFigure = document.querySelectorAll("#right .square");
const backFigure = document.querySelectorAll("#back .square");
const bottomFigure = document.querySelectorAll("#bottom .square");
const reloadBtn = document.querySelector(".fa-sync-alt");

class Cube {
  constructor() {
    this.cube = {
      top: [
        ["white", "white", "white"],
        ["white", "white", "white"],
        ["white", "white", "white"],
      ],
      left: [
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
      ],
      front: [
        ["green", "green", "green"],
        ["green", "green", "green"],
        ["green", "green", "green"],
      ],
      right: [
        ["red", "red", "red"],
        ["red", "red", "red"],
        ["red", "red", "red"],
      ],
      back: [
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
      ],
      bottom: [
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
      ],
    };
  }

  // returns a new table of the figure's selected perimeter, depending on the move : eg. [00,01,02,10,11,12,20,21,22]
  getFigurePerimeter(move) {
    let figure;
    switch (move) {
      case "U": {
        figure = this.cube.top;
        break;
      }
      case "D": {
        figure = this.cube.bottom;
        break;
      }
      case "L": {
        figure = this.cube.left;
        break;
      }
      case "R": {
        figure = this.cube.right;
        break;
      }
      case "F": {
        figure = this.cube.front;
        break;
      }
      case "B": {
        figure = this.cube.back;
        break;
      }
    }
    return [
      figure[0][0],
      figure[0][1],
      figure[0][2],
      figure[1][2],
      figure[2][2],
      figure[2][1],
      figure[2][0],
      figure[1][0],
    ];
  }

  // Used in getLinePerimeter(move) only
  getFigureColumn(figure, column) {
    const array = [];
    for (let i = 0; i < 3; i++) {
      array.push(figure[i][column]);
    }
    return array;
  }

  // returns a new table of the line's selected perimeter, depending on the move : eg. [[00,01,02],[00,01,02],[00,01,02],[00,01,02]]
  getLinePerimeter(move) {
    switch (move) {
      case "U": {
        return [
          this.cube.left[0],
          this.cube.front[0],
          this.cube.right[0],
          this.cube.back[0],
        ];
      }
      case "D": {
        return [
          this.cube.left[2],
          this.cube.front[2],
          this.cube.right[2],
          this.cube.back[2],
        ];
      }
      case "L": {
        return [
          this.getFigureColumn(this.cube.bottom, 0),
          this.getFigureColumn(this.cube.front, 0),
          this.getFigureColumn(this.cube.top, 0),
          this.getFigureColumn(this.cube.back, 2).reverse(),
        ];
      }
      case "R": {
        return [
          this.getFigureColumn(this.cube.bottom, 2),
          this.getFigureColumn(this.cube.front, 2),
          this.getFigureColumn(this.cube.top, 2),
          this.getFigureColumn(this.cube.back, 0).reverse(),
        ];
      }
      case "F": {
        return [
          this.getFigureColumn(this.cube.left, 2).reverse(),
          this.cube.top[2],
          this.getFigureColumn(this.cube.right, 0),
          this.cube.bottom[0].reverse(),
        ];
      }
      case "B": {
        return [
          this.getFigureColumn(this.cube.left, 0).reverse(),
          this.cube.top[0],
          this.getFigureColumn(this.cube.right, 2),
          this.cube.bottom[2].reverse(),
        ];
      }
    }
  }

  generateTextualCombination() {
    this.generatedCombination = [];
    for (let i = 0; i < Math.floor(18 + Math.random() * 6); i++) {
      switch (Math.floor(Math.random() * 6)) {
        case 0: {
          this.generatedCombination.push("U");
          break;
        }
        case 1: {
          this.generatedCombination.push("L");
          break;
        }
        case 2: {
          this.generatedCombination.push("F");
          break;
        }
        case 3: {
          this.generatedCombination.push("R");
          break;
        }
        case 4: {
          this.generatedCombination.push("B");
          break;
        }
        case 5: {
          this.generatedCombination.push("D");
          break;
        }
      }
    }
  }

  // returns a new object with the changes applied on every move : {figurePerimeter: [], linePerimeter: []}
  applyFigureRotation(move) {
    switch (move) {
      case "U":
      case "R":
      case "F": {
        return {
          figurePerimeter: this.getFigurePerimeter(move).unshift(
            this.getFigurePerimeter(move).splice(6, 2)
          ),
          linePerimeter: this.getLinePerimeter(move).push(
            this.getLinePerimeter(move).splice(0, 1)
          ),
        };
      }
      case "D":
      case "L":
      case "B": {
        return {
          figurePerimeter: this.getFigurePerimeter(move).push(
            this.getFigurePerimeter(move).splice(0, 2)
          ),
          linePerimeter: this.getLinePerimeter(move).unshift(
            this.getLinePerimeter(move).splice(3, 1)
          ),
        };
      }
    }
  }

  // Function that has to be called
  applyFigurePerimeterRotationChangesWithinCubeObject(rotatedFigure, move) {
    rotatedFigure[0][0] = this.applyFigureRotation(move).figurePerimeter[0];
    rotatedFigure[0][1] = this.applyFigureRotation(move).figurePerimeter[1];
    rotatedFigure[0][2] = this.applyFigureRotation(move).figurePerimeter[2];
    rotatedFigure[1][2] = this.applyFigureRotation(move).figurePerimeter[3];
    rotatedFigure[2][2] = this.applyFigureRotation(move).figurePerimeter[4];
    rotatedFigure[2][1] = this.applyFigureRotation(move).figurePerimeter[5];
    rotatedFigure[2][0] = this.applyFigureRotation(move).figurePerimeter[6];
    rotatedFigure[1][0] = this.applyFigureRotation(move).figurePerimeter[7];
  }

  // Function that has to be called
  applyLinePerimeterRotationChangesWithinCubeObject(move) {
    switch (move) {
      case "U": {
        [
          this.cube.left[0],
          this.cube.front[0],
          this.cube.right[0],
          this.cube.back[0],
        ] = [this.applyFigureRotation("U").linePerimeter];
        break;
      }
      case "D": {
        [
          this.cube.left[2],
          this.cube.front[2],
          this.cube.right[2],
          this.cube.back[2],
        ] = [this.applyFigureRotation("D").linePerimeter];
        break;
      }
      case "L": {
        [
          [
            this.cube.bottom[0][0],
            this.cube.bottom[1][0],
            this.cube.bottom[2][0],
          ],
          [this.cube.front[0][0], this.cube.front[1][0], this.cube.front[2][0]],
          [this.cube.top[0][0], this.cube.top[1][0], this.cube.top[2][0]],
          [this.cube.back[2][2], this.cube.back[1][2], this.cube.back[0][2]],
        ] = [this.applyFigureRotation("L").linePerimeter];
        break;
      }
      case "R": {
        [
          [
            this.cube.bottom[0][2],
            this.cube.bottom[1][2],
            this.cube.bottom[2][2],
          ],
          [this.cube.front[0][2], this.cube.front[1][2], this.cube.front[2][2]],
          [this.cube.top[0][2], this.cube.top[1][2], this.cube.top[2][2]],
          [this.cube.back[2][0], this.cube.back[1][0], this.cube.back[0][0]],
        ] = [this.applyFigureRotation("R").linePerimeter];
        break;
      }
      case "F": {
        [
          [this.cube.left[2][2], this.cube.left[1][2], this.cube.left[0][2]],
          this.cube.top[2],
          [this.cube.right[0][0], this.cube.right[1][0], this.cube.right[2][0]],
          [
            this.cube.bottom[0][2],
            this.cube.bottom[0][1],
            this.cube.bottom[0][0],
          ],
        ] = [this.applyFigureRotation("F").linePerimeter];
        break;
      }
      case "B": {
        [
          [this.cube.left[2][2], this.cube.left[1][2], this.cube.left[0][2]],
          this.cube.top[2],
          [this.cube.right[0][2], this.cube.right[1][2], this.cube.right[2][2]],
          [
            this.cube.bottom[2][2],
            this.cube.bottom[2][1],
            this.cube.bottom[2][0],
          ],
        ] = [this.applyFigureRotation("B").linePerimeter];
        break;
      }
    }
  }

  // The application of the two previous functions (Like commented before)
  applyChangesWithinCubeObject() {
    this.generateTextualCombination();
    for (const move of this.generatedCombination) {
      // TODO add the possibility nb of repetitons
      switch (
        move[0] // ! [0] is only useful when there are 2 and '
      ) {
        case "U": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "U"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("U");
          break;
        }
        case "D": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "D"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("D");
          break;
        }
        case "L": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "L"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("L");
          break;
        }
        case "R": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "R"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("R");
          break;
        }
        case "F": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "F"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("F");
          break;
        }
        case "B": {
          this.applyFigurePerimeterRotationChangesWithinCubeObject(
            this.cube.top,
            "B"
          );
          this.applyLinePerimeterRotationChangesWithinCubeObject("B");
          break;
        }
      }
    }
    // this.applyGraphicCombination();
  }

  // Function that as to be called with arguments to work
  applyCubeObjectChangesWithinHTML(graphicFigure, classFigure) {
    let [line, column] = [0, 0];
    for (const square of graphicFigure) {
      if (square.classList === 2) {
        square.classList.remove(square.classList[square.classList.length - 1]); // Remove the color on each square of a figure
      }
      square.classList.add(classFigure[line][column]); // Add the new color since the combination has been generated
      if (column === 2) {
        line++;
        column = 0;
      } else {
        column++;
      }
    }
  }

  // Application of the previous function
  applyGraphicModifications() {
    // if (this.generatedCombination !== undefined) {
    // this.applyChangesWithinCubeObject();
    // }
    this.applyCubeObjectChangesWithinHTML(topFigure, this.cube.top);
    this.applyCubeObjectChangesWithinHTML(leftFigure, this.cube.left);
    this.applyCubeObjectChangesWithinHTML(frontFigure, this.cube.front);
    this.applyCubeObjectChangesWithinHTML(rightFigure, this.cube.right);
    this.applyCubeObjectChangesWithinHTML(backFigure, this.cube.back);
    this.applyCubeObjectChangesWithinHTML(bottomFigure, this.cube.bottom);
  }
  // Terminé jusque là !!
}

const cube = new Cube();
window.onload = () => {
  cube.applyGraphicModifications();
};

reloadBtn.addEventListener("click", () => {
  cube.generateTextualCombination();
  cube.applyChangesWithinCubeObject();
  combination.innerHTML = cube.generatedCombination.join(" ");
});
