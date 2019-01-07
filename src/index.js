import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.color} onClick={props.onClick}>
      {}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blackSquares: Array(100).fill(0),
      number: 1,
    }
  }

  gameOfLifeFunction () {
    console.log('hello')
  }

  color(square) {
    if (square) {
      return 'square-black'
    } else {
      return 'square-white'
    }
  }

  changeColor (i) {
      const current = this.state.blackSquares;
      current[i] = (current[i]+1) % 2;
      this.setState({
        blackSquares: current
      })
  }

  gameOfLife () {
    let value = 0;
    const current = this.state.blackSquares
    for (var i = 0; i < current.length; i++) {
      value = 0;
      value += current[i+1] || 0
      value += current[i-1] || 0
      value += current[i+10] || 0
      value += current[i+11] || 0
      value += current[i+9] || 0
      value += current[i-10] || 0
      value += current[i-11] || 0
      value += current[i-9] || 0
      if (value < 2 || value > 3) {
        current[i] = 0;
      } else if (current[i] === 0 && value !== 3 ) {
        current[i] = 0;
      }  else {
        current[i] = 1;
      }
    }
    this.setState({
      blackSquares: current
    })
  }

  runGame () {
    this.interval = setInterval (() => {
      this.setState({
        number: this.state.number + 1,
      });
      this.gameOfLife();
    }, 500)
  }

  pauseGame () {
    clearInterval(this.interval);
  }
  
  randomise () {
    const newArray = Array(100).fill(0)
    for (var i = 0; i < newArray.length; i++) {
      newArray[i] = (Math.random() > 0.5) ? 1 : 0;
    }
    this.setState({
      blackSquares: newArray
    })
  }

  renderSquare(i) {
    return (
      <Square
        onClick={() => this.changeColor(i)}
        color={this.color(this.state.blackSquares[i])}
        value={i}
      />
    );
  }

  renderTable() {
    let table = []
    for (var j = 0; j < 10; j++) {
      let row = []
      for (var i = 0; i < 10; i++) {
        row.push(this.renderSquare(i+j*10))
      }
      table.push(<div className="board-row">{row}</div>)
    }
    return table
  }

  render() {
    return(
      <div>
        {this.renderTable()}
        {this.state.number}
        <button onClick={() => this.runGame()}>Start Game</button>
        <button onClick={() => this.pauseGame()}>Pause</button>
        <button onClick={() => this.randomise()}>randomise</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
