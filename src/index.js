import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.color} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blackSquares: Array(100).fill(false),
    }
  }

  color(square) {
    if (square) {
      return 'square-black'
    } else {
      return 'square-white'
    }
  }

  changeColor (i) {
    console.log(i)
      const current = this.state.blackSquares;
      current[i] = !current[i];
      this.setState({
        blackSquares: current
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
      </div>
    )
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
