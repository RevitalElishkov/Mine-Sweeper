'use strict'

const MINE = '💣';
const FLEG = '🚩';


var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};



function initGame() {
    // console.log('buildBoard()',buildBoard())
    gBoard = buildBoard();
    runNegsNums(gBoard)
    renderBoard(gBoard, '.board')
    
   
    //runMinesCount(gBoard)
    console.log('gBoard', gBoard)
}

function buildBoard() {

    var board = createMat(4, 4);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: true,
                isMine: false,
                isMarked: true
            };
            board[i][j] = cell;
        }
    }

    // Place the Mines
    board[0][2].isMine = true;
    board[2][3].isMine = true;

    //  console.log(board,'board');
    return board;
}


function renderBoard(board, selector) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            var className = 'cell' + i + '-' + j;

            strHTML += '\t<td class="cell' + className +
                '" class="unclicked" onclick="cellClicked(this , "' + i + '" , "' + j + '")" >\n';
               
                if (currCell.isMine) strHTML += '<span class="mine">'+MINE+'</span>' 
                else strHTML +='<span class="num">'+currCell.minesAroundCount+'</span>'
        }
       

        strHTML += '\t</td>\n';
    }
    strHTML += '</tr>\n';

    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}


function runNegsNums(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if ( board[i][j].isMine) continue
            
            board[i][j].minesAroundCount = setMinesNegsCount(i, j, board)

        }
    }
}


function setMinesNegsCount(cellI, cellJ, board) {

    var countMines = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellI && j === cellJ) continue;
            if (board[i][j].isMine) {
                countMines++
            }
        }
    }
    return countMines;
}


// function cellClicked(elCell, i, j) { }

// function cellMarked(elCell) { }

// function checkGameOver() { }

// function expandShown(board, elCell, i, j) { }
