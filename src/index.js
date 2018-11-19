import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Emoji } from "./Emoji";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let status;
    if (this.props.winner) status = this.props.winner + " won!";
    else status = "Next player: " + this.props.next_player;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next_player: "X",
      history: [{ squares: Array(9).fill(null) }],
      shown_move: 0
    };
  }

  handleClick(i) {
    const shown_squares = this.state.history[this.state.shown_move].squares;

    //prevent processing if there's already a winner
    let winner = calculateWinner(shown_squares);
    if (winner) return;

    //prevent processing of clicks twice on the same square
    if (shown_squares[i]) return;

    let last_move = this.state.history.length - 1;
    let history;
    if (this.state.shown_move < last_move) {
      history = this.state.history.slice(0, this.state.shown_move + 1);
      last_move = this.state.shown_move;
    } else {
      history = this.state.history.slice();
    }
    let next_player = last_move % 2 === 0 ? "X" : "O";

    //do the move
    const squares = this.state.history[last_move].squares.slice();
    squares[i] = next_player;

    this.setState({
      history: history.concat({ squares: squares }),
      next_player: (this.state.shown_move + 1) % 2 === 0 ? "X" : "O",
      shown_move: this.state.shown_move + 1
    });
  }

  jumpTo(index) {
    this.setState({
      shown_move: index,
      next_player: index % 2 === 0 ? "X" : "O"
    });
  }

  renderBoard() {
    return (
      <Board
        squares={this.state.history[this.state.shown_move].squares}
        next_player={this.state.next_player}
        onClick={i => this.handleClick(i)}
        winner={calculateWinner(
          this.state.history[this.state.shown_move].squares
        )}
      />
    );
  }

  render() {
    const jumpControls = this.state.history.map((squares, move) => (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>
          {move === 0 ? "Go to game start" : "Go to move " + move}
        </button>
      </li>
    ));
    return (
      <div className="game">
        <div className="game-board">{this.renderBoard()}</div>
        <div className="game-info">
          <div>
            {`${this.state.history.length - 1} moves have been played!`}{" "}
            <Emoji symbol="🧙‍" label="mage" />
          </div>
          <ul>{jumpControls}</ul>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] !== null &&
      squares[a] === squares[b] &&
      squares[b] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
