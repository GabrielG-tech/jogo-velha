import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Componente de class Quadrado
function Square(props) {
    return (
    <button className="square" onClick={props.onClick()}>
        { this.props.value }
    </button>
    );
}
// Componente de Class Tabuleiro
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    }
    renderSquare(i) {
        return <Square
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
                    />
    }
    handleClick(i) {
            const squares = [...this.state.squares];
            if (!caluclateWinner(squares) && !squares[i]) {
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
            });
        }
    }
    render() {
        
        const status = 'Próximo jogador: X';
        return (
            <div>
                <div className='status'>{status}</div>
                <div className='board-row'>
                    {(this.renderSquare(0))}
                    {(this.renderSquare(1))}
                    {(this.renderSquare(2))}
                </div>
                <div className='board-row'>
                    {(this.renderSquare(3))}
                    {(this.renderSquare(4))}
                    {(this.renderSquare(5))}
                </div>
                <div className='board-row'>
                    {(this.renderSquare(6))}
                    {(this.renderSquare(7))}
                    {(this.renderSquare(8))}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{}</div>
                    <ol>{}</ol>
                </div>
            </div>
        );
    }
}

function caluclateWinner(squares) {
    const lines = [
        [0, 1, 2], // linha 1
        [3, 4, 5], // linha 2
        [6, 7, 8], // linha 3
        [0, 3, 6], // coluna 1
        [1, 4, 7], // coluna 2
        [2, 5, 8], // coluna 3
        [0, 4, 8], // diagonal 1
        [2, 4, 6], // diagonal 2
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c])
            return squares[a];
    }
    return null;
}

const root = document.getElementById('root');
ReactDOM.render(<Game/>, root);