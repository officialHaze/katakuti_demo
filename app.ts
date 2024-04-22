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

  public static handleClickOnBlock(this: HTMLTableCellElement, ev: MouseEvent) {
    const id = this.getAttribute("id") || "";

    const row = id.split("-")[0];
    const col = id.split("-")[1];

    console.log("row: ", row, "col: ", col);

    this.innerText = Game.currentPlayer === 1 ? "X" : "O";
    Game.blocksFilled++;

    // Main logic

    if (Game.blocksFilled >= 9) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
      return;
    }

    Game.switchPlayer();
  }
}

Game.new();
