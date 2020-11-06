const topFigure = document.querySelectorAll("#top .square");
const leftFigure = document.querySelectorAll("#left .square");
const frontFigure = document.querySelectorAll("#front .square");
const rightFigure = document.querySelectorAll("#right .square");
const backFigure = document.querySelectorAll("#back .square");
const bottomFigure = document.querySelectorAll("#bottom .square");

export class RubikCube {
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
    this.rotatedFigure = {};
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

  // Add 2 or ' depending on the last move : eg. (LL -> L2) and (L2L -> L')
  addMove(move) {
    const lastMove = this.generatedCombination[
      this.generatedCombination.length - 1
    ];
    // this.modiffyLastMoves(move);
    if (lastMove === move) {
      this.generatedCombination.pop();
      this.generatedCombination.push(lastMove + "2");
    } else if (
      lastMove !== undefined &&
      lastMove[0] === move &&
      lastMove[1] == 2
    ) {
      this.generatedCombination.pop();
      this.generatedCombination.push(lastMove[0] + "'");
    } else if (lastMove !== undefined && lastMove[0] === move) {
      this.generatedCombination.pop();
    } else {
      this.generatedCombination.push(move);
    }
  }

  lastMoveLengthIsTwo() {
    const lastMove = this.generatedCombination[
      this.generatedCombination.length - 1
    ];
    if (lastMove !== undefined) {
      if (lastMove.length === 2) {
        return true;
      }
    }
  }

  twoLastMovesSameAxis() {
    if (this.generatedCombination.length < 2) {
      return;
    }
    const secondLastMove = this.generatedCombination[
      this.generatedCombination.length - 2
    ][0];
    const lastMove = this.generatedCombination[
      this.generatedCombination.length - 1
    ][0];
    const isUpDownAxis =
      (secondLastMove === "U" && lastMove === "D") ||
      (secondLastMove === "D" && lastMove === "U");
    const isLeftRightAxis =
      (secondLastMove === "L" && lastMove === "R") ||
      (secondLastMove === "R" && lastMove === "L");
    const isFrontBackAxis =
      (secondLastMove === "F" && lastMove === "B") ||
      (secondLastMove === "B" && lastMove === "F");

    return isUpDownAxis || isLeftRightAxis || isFrontBackAxis ? true : false;
  }

  //! A tester
  modiffyLastMoves(move) {
    const secondLastMove = this.generatedCombination[
      this.generatedCombination.length - 2
    ];
    if (this.twoLastMovesSameAxis() && move === secondLastMove[0]) {
      if (secondLastMove.length === 2) {
        if (secondLastMove[1] == 2) {
          this.generatedCombination[this.generatedCombination.length - 2] =
            move + "'";
        } else {
          this.generatedCombination.splice(
            this.generatedCombination.length - 2,
            1
          );
        }
      } else {
        this.generatedCombination[this.generatedCombination.length - 2] =
          move + "2";
      }
    }
  }

  generateTextualCombination() {
    this.generatedCombination = [];
    for (let i = 0; i < Math.ceil(20 + Math.random() * 6); i++) {
      this.lastMoveLengthIsTwo() ? i-- : i;
      switch (Math.floor(Math.random() * 6)) {
        case 0: {
          this.addMove("U");
          break;
        }
        case 1: {
          this.addMove("D");
          break;
        }
        case 2: {
          this.addMove("L");
          break;
        }
        case 3: {
          this.addMove("R");
          break;
        }
        case 4: {
          this.addMove("F");
          break;
        }
        case 5: {
          this.addMove("B");
          break;
        }
      }
    }
  }

  // returns a new object with the changes applied on every move : {figurePerimeter: [], linePerimeter: []}
  applyFigureRotation(move) {
    let repetition = 1;
    const figurePerimeter = this.getFigurePerimeter(move[0]);
    const linePerimeter = this.getLinePerimeter(move[0]);

    switch (move[0]) {
      case "U":
      case "L":
      case "B": {
        linePerimeter.push(linePerimeter.shift());
        break;
      }
      case "D":
      case "R":
      case "F": {
        linePerimeter.unshift(linePerimeter.pop());
        break;
      }
    }
    // }
    for (let i = 0; i < 2 * repetition; i++) {
      figurePerimeter.unshift(figurePerimeter.pop());
    }
    return {
      figurePerimeter: figurePerimeter,
      linePerimeter: linePerimeter,
    };
  }

  // Function that has to be called (figure perimeter)
  applyFigurePerimeterRotationChangesWithinCubeObject(move) {
    let figure;
    switch (move[0]) {
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
    figure[0] = [
      this.rotatedFigure.figurePerimeter[0],
      this.rotatedFigure.figurePerimeter[1],
      this.rotatedFigure.figurePerimeter[2],
    ];
    figure[1][2] = this.rotatedFigure.figurePerimeter[3];
    figure[2] = [
      this.rotatedFigure.figurePerimeter[6],
      this.rotatedFigure.figurePerimeter[5],
      this.rotatedFigure.figurePerimeter[4],
    ];
    figure[1][0] = this.rotatedFigure.figurePerimeter[7];
  }

  // Function that has to be called (line perimeter)
  applyLinePerimeterRotationChangesWithinCubeObject(move) {
    const changesToApply = [
      this.rotatedFigure.linePerimeter[0],
      this.rotatedFigure.linePerimeter[1],
      this.rotatedFigure.linePerimeter[2],
      this.rotatedFigure.linePerimeter[3],
    ];
    switch (move[0]) {
      case "U": {
        [
          this.cube.left[0],
          this.cube.front[0],
          this.cube.right[0],
          this.cube.back[0],
        ] = changesToApply;
        break;
      }
      case "D": {
        [
          this.cube.left[2],
          this.cube.front[2],
          this.cube.right[2],
          this.cube.back[2],
        ] = changesToApply;
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
        ] = changesToApply;
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
        ] = changesToApply;
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
        ] = changesToApply;
        break;
      }
      case "B": {
        [
          [this.cube.left[2][0], this.cube.left[1][0], this.cube.left[0][0]],
          this.cube.top[0],
          [this.cube.right[0][2], this.cube.right[1][2], this.cube.right[2][2]],
          [
            this.cube.bottom[2][2],
            this.cube.bottom[2][1],
            this.cube.bottom[2][0],
          ],
        ] = changesToApply;
        break;
      }
    }
  }

  // Define the number of times that we need to apply the rotation
  repetitions(move) {
    return move.length > 1 ? (move[1] == 2 ? 2 : 3) : 1;
  }

  // The application of the two previous functions (Like commented before)
  applyChangesWithinCubeObject() {
    this.generateTextualCombination();
    for (const move of this.generatedCombination) {
      let repetition;
      repetition = this.repetitions(move);

      for (let i = 0; i < repetition; i++) {
        this.rotatedFigure = this.applyFigureRotation(move);
        this.applyFigurePerimeterRotationChangesWithinCubeObject(move);
        this.applyLinePerimeterRotationChangesWithinCubeObject(move);
      }
    }
  }

  // Function that as to be called with arguments to work : apply css classes on html elements for graphical render
  applyCubeObjectChangesWithinHTML(graphicFigure, classFigure) {
    let [line, column] = [0, 0];
    for (const square of graphicFigure) {
      if (square.classList.length === 2) {
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

  // Application of the previous function ==> Problem encoutered, see red mark below
  applyGraphicModifications() {
    this.applyCubeObjectChangesWithinHTML(topFigure, this.cube.top);
    this.applyCubeObjectChangesWithinHTML(leftFigure, this.cube.left);
    this.applyCubeObjectChangesWithinHTML(frontFigure, this.cube.front);
    this.applyCubeObjectChangesWithinHTML(rightFigure, this.cube.right);
    this.applyCubeObjectChangesWithinHTML(backFigure, this.cube.back);
    this.applyCubeObjectChangesWithinHTML(bottomFigure, this.cube.bottom);
  }
}
