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

  selectedFigure(move) {
    switch (move) {
      case "U": {
        return this.cube.top;
      }
      case "D": {
        return this.cube.bottom;
      }
      case "L": {
        return this.cube.left;
      }
      case "R": {
        return this.cube.right;
      }
      case "F": {
        return this.cube.front;
      }
      case "B": {
        return this.cube.back;
      }
    }
  }

  // returns a new table of the figure's selected perimeter, depending on the move : eg. [00,01,02,10,11,12,20,21,22]
  getFigurePerimeter(move) {
    return [
      this.selectedFigure(move)[0][0],
      this.selectedFigure(move)[0][1],
      this.selectedFigure(move)[0][2],
      this.selectedFigure(move)[1][2],
      this.selectedFigure(move)[2][2],
      this.selectedFigure(move)[2][1],
      this.selectedFigure(move)[2][0],
      this.selectedFigure(move)[1][0],
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

  returnArray(move, line1, line2, column1, column2) {
    switch (move) {
      case "U":
      case "D": {
        return [
          this.cube.left[line1],
          this.cube.front[line1],
          this.cube.right[line1],
          this.cube.back[line1],
        ];
      }
      case "L":
      case "R": {
        return [
          this.getFigureColumn(this.cube.bottom, column1),
          this.getFigureColumn(this.cube.front, column1),
          this.getFigureColumn(this.cube.top, column1),
          this.getFigureColumn(this.cube.back, column2).reverse(),
        ];
      }
      case "F":
      case "B": {
        return [
          this.getFigureColumn(this.cube.left, column1).reverse(),
          this.cube.top[line1],
          this.getFigureColumn(this.cube.right, column2),
          this.cube.bottom[line2].reverse(),
        ];
      }
    }
  }

  // returns a new table of the line's selected perimeter, depending on the move : eg. [[00,01,02],[00,01,02],[00,01,02],[00,01,02]]
  getLinePerimeter(move) {
    switch (move) {
      case "U": {
        return this.returnArray(move, 0, undefined, undefined, undefined);
      }
      case "D": {
        return this.returnArray(move, 2, undefined, undefined, undefined);
      }
      case "L": {
        return this.returnArray(move, undefined, undefined, 0, 2);
      }
      case "R": {
        return this.returnArray(move, undefined, undefined, 2, 0);
      }
      case "F": {
        return this.returnArray(move, 2, 0, 2, 0);
      }
      case "B": {
        return this.returnArray(move, 0, 2, 0, 2);
      }
    }
  }

  twoLastMovesSameAxis() {
    if (this.generatedCombination.length >= 2) {
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
  }

  modifyLastMove(moveToChange, ongoingMove, positionFromLast) {
    this.doNotIncrement = true;

    if (moveToChange.length === 2) {
      switch (moveToChange[1]) {
        case "2": {
          this.generatedCombination.splice(
            -positionFromLast,
            1,
            `${ongoingMove}'`
          );
          break;
        }
        case "'": {
          this.generatedCombination.splice(-positionFromLast, 1);
          break;
        }
      }
    } else {
      this.generatedCombination.splice(-positionFromLast, 1, `${ongoingMove}2`);
    }
  }

  // Add 2, ' or delete depending on the last move : eg. (LL -> L2), (L2L -> L') and (L'L => "")
  addMove(move) {
    const lastMoves = {
      penultimate: this.generatedCombination[
        this.generatedCombination.length - 2
      ],
      last: this.generatedCombination[this.generatedCombination.length - 1],
    };

    if (lastMoves.last !== undefined && lastMoves.last[0] === move) {
      this.modifyLastMove(lastMoves.last, move, 1);
    } else if (
      lastMoves.penultimate !== undefined &&
      this.twoLastMovesSameAxis() &&
      lastMoves.penultimate[0] === move
    ) {
      this.modifyLastMove(lastMoves.penultimate, move, 2);
    } else {
      this.generatedCombination.push(move);
      this.doNotIncrement = false;
    }
  }

  generateTextualCombination() {
    this.doNotIncrement = false;
    this.generatedCombination = [];
    for (let i = 0; i < Math.ceil(20 + Math.random() * 6); i++) {
      this.doNotIncrement ? i-- : i;
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
    for (let i = 0; i < 2; i++) {
      figurePerimeter.unshift(figurePerimeter.pop());
    }
    return {
      figurePerimeter: figurePerimeter,
      linePerimeter: linePerimeter,
    };
  }

  // Function that has to be called (figure perimeter)
  applyFigurePerimeterRotationChangesWithinCubeObject(move) {
    let figure = this.selectedFigure(move[0]);
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
