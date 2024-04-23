interface PlayerMoves {
  row: number;
  col: number;
}

class Player {
  private moves: PlayerMoves[] = [];

  // Getters
  public getPlayerMoves() {
    return this.moves;
  }

  // Setters
  public pushPlayerMove(move: PlayerMoves) {
    this.moves.push(move);
  }

  public resetMoves() {
    this.moves = [];
  }
}

class Board {
  private rows = 3;
  private cols = 3;

  public draw() {
    for (let i = 0; i < this.rows; i++) {
      // Get the main table
      const parentTable = document.getElementById("board");

      // Create a new tr element
      const newRow = document.createElement("tr");
      parentTable?.appendChild(newRow);

      for (let j = 0; j < this.cols; j++) {
        // Create a new td element. Call it block
        const block = document.createElement("td");
        block.setAttribute("id", `${i}-${j}`); // row-col
        block.style.padding = "2rem";
        block.style.border = "solid";
        block.style.borderColor = "black";

        // Add a click event to each block
        block.addEventListener("click", Game.handleClickOnBlock);

        // Append the block to the current row
        newRow.appendChild(block);
      }
    }
  }
}

class Game {
  private static currentPlayer = 1;
  private static blocksFilled = 0;

  private static player1 = new Player();
  private static player2 = new Player();

  public static new() {
    // Draw the board
    const board = new Board();
    board.draw();
  }

  private static switchPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  private static isWon(moves: PlayerMoves[]) {
    // Seperate all the rows and cols in different lists
    const rows: number[] = [];
    const cols: number[] = [];
    moves.forEach((move) => {
      rows.push(move.row);
      cols.push(move.col);
    });

    // Sort the row and col arrays in ascending order
    // Insertion sorting rows
    for (let i = 1; i < rows.length; i++) {
      const key = rows[i];
      let j = i - 1;
      while (j >= 0 && rows[j] > key) {
        rows[j + 1] = rows[j];
        j--;
      }
      rows[j + 1] = key;
    }
    // Insertion sorting cols
    for (let i = 1; i < cols.length; i++) {
      const key = cols[i];
      let j = i - 1;
      while (j >= 0 && cols[j] > key) {
        cols[j + 1] = cols[j];
        j--;
      }
      cols[j + 1] = key;
    }

    console.log({ sortedRows: rows, sortedCols: cols });

    // Check if 3 consecutive moves are all same from the list of moves of the player
    // If they are same, then player has won
    let i = 0; // Start point
    let j = 2; // end point
    // For rows
    while (i <= rows.length - 3 && j <= rows.length - 1) {
      if (rows[i] === rows[i + 1] && rows[i + 1] === rows[j]) {
        return true; // Break, player has already won, no need to check further
      }
      i++;
      j++;
    }

    // For cols
    i = 0; // Reset
    j = 2; // Reset
    while (i <= cols.length - 3 && j <= cols.length - 1) {
      if (cols[i] === cols[i + 1] && cols[i + 1] === cols[j]) {
        return true; // Break, player has already won, no need to check further
      }
      i++;
      j++;
    }

    // Check for diagonal moves
    // Diagonal moves can only be of 2 types, in the format:- (row, col):-
    // Type 1:
    // (0,0), (1,1), (2,2)
    // Type 2:
    // (0,2), (1,1). (2,0)
    // In both the types the sum of rows and sum of cols should add up to be 3
    i = 0;
    j = 2;
    while (i <= rows.length - 3 && j <= rows.length - 1) {
      let sumOfRows = 0;
      let sumOfCols = 0;

      for (let k = i; k <= j; k++) {
        sumOfRows += rows[k];
        sumOfCols += cols[k];
      }

      if (sumOfRows === 3 && sumOfCols === 3) return true;

      i++;
      j++;
    }

    return false;
  }

  public static handleClickOnBlock(this: HTMLTableCellElement, ev: MouseEvent) {
    if (Game.blocksFilled < 9) {
      const id = this.getAttribute("id") || "";

      const row = id.split("-")[0];
      const col = id.split("-")[1];

      console.log("row: ", row, "col: ", col);

      const currentMove: PlayerMoves = {
        row: isNaN(parseInt(row)) ? -1 : parseInt(row),
        col: isNaN(parseInt(col)) ? -1 : parseInt(col),
      };

      this.innerText = Game.currentPlayer === 1 ? "X" : "O";
      Game.blocksFilled++;

      // Main logic
      switch (Game.currentPlayer) {
        case 1:
          // Player 1 related processing //

          // Push the current move to the existing moves list
          Game.player1.pushPlayerMove(currentMove);

          // Get the updated player moves
          const player1Moves = Game.player1.getPlayerMoves();
          console.log({ player1Moves });

          if (Game.isWon(player1Moves)) return alert("Player 1 has won!");
          break;

        case 2:
          // Player 2 related processing

          // Push the current move to the existing moves list
          Game.player2.pushPlayerMove(currentMove);

          // Get the updated player moves
          const player2Moves = Game.player2.getPlayerMoves();
          console.log({ player2Moves });

          if (Game.isWon(player2Moves)) return alert("Player 2 has won!");
          break;

        default:
          break;
      }

      Game.switchPlayer();
    }
  }
}

Game.new();
