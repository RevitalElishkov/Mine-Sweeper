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

var gMines = [];

var timer;

var gTimer = false;



function initGame() {

    // console.log('buildBoard()',buildBoard())
    gBoard = buildBoard();
    randMine(gBoard);
    runNegsNums(gBoard);
    renderBoard(gBoard, '.board');
    console.log('gBoard', gBoard)
}


function levels(level) {
    console.log('level', level);
    switch (level) {
        case 'Beginner':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            initGame();
            break;
        case 'Medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            initGame();
            break;
        case 'Expert':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            initGame();
            break;
    }
}

function buildBoard() {

    var board = createMat(gLevel.SIZE, gLevel.SIZE);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    return board;
}

// Place random Mines

function randMine(board) {

    for (var i = 0; i < gLevel.MINES; i++) {
        var mine = {
            i: getRandomInt(0, gLevel.SIZE),
            j: getRandomInt(0, gLevel.SIZE)
        };
     
        board[mine.i][mine.j].isMine = true
    }
}


function renderBoard(board, selector) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n';
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j];
            // var className = 'cell' + i + '-' + j;
            if (currCell.isMine) {
                strHTML += `\t<td class="mine" 
            onclick="cellClicked(this , ${i} , ${j})" oncontextmenu="cellMarked(event, ${i} , ${j})">\n`
            } else {
                strHTML += `\t<td class="cell cell${i}-${j}" 
            onclick="cellClicked(this , ${i} , ${j})" oncontextmenu="cellMarked(event, ${i} , ${j})">\n`
            }

            if (currCell.isMine && currCell.isShown && !currCell.isMarked) strHTML += `<span>${MINE}</span>`;

            if (!currCell.isMine && currCell.isShown && !currCell.isMarked) {
                strHTML += board[i][j].minesAroundCount
            };
            if (currCell.isMarked) strHTML += `<span>${FLEG}</span>`;
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
            if (board[i][j].isMine) continue

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


function cellClicked(elCell, i, j) {
    console.log('cellClicked', cellClicked);
    if (!gTimer) {
        timer = setInterval(stopWatch, 1000);
        gTimer = true;
    }

    gBoard[i][j].isShown = true

    if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
        gameOver();
        var msgL = document.querySelector('.modal')
        msgL.innerText = 'Next Time..';
    // } else if (gBoard[i][j].minesAroundCount === 0) {
    //     expandShown(gBoard, i, j);
    } else {
        //console.log('gBoard[i][j].isShown', gBoard[i][j].isShown);
        checkGameOver();
    }
    renderBoard(gBoard, '.board');
}

function cellMarked(event, i, j) {
    console.log('cellMarked', cellMarked);
    event.preventDefault()
    if (!gTimer) {
        timer = setInterval(stopWatch, 1000);
        gTimer = true;
    }

    if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
        gBoard[i][j].isMarked = true;
    } else gBoard[i][j].isMarked = false;

    renderBoard(gBoard, '.board');
    checkGameOver();
}

function checkGameOver() {
    var boardSize = gLevel.SIZE * gLevel.SIZE;
    var sumClearedTabs = boardSize - gLevel.MINES
    var countFlegedMines = 0;
    var countClearedTabs = 0;
    var isAllMineCoverd = false;
    var isAllTabsCleared = false;

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine && gBoard[i][j].isMarked & !gBoard[i][j].isShown)
                countFlegedMines++
            if (!gBoard[i][j].isMine && !gBoard[i][j].isMarked & gBoard[i][j].isShown)
                countClearedTabs++
        }
    }
    if (countFlegedMines === gLevel.MINES) {
        isAllMineCoverd = true;
    }
    var sumClearedTabs = boardSize - gLevel.MINES
    if (countClearedTabs === sumClearedTabs) {
        isAllTabsCleared = true;
    }

    if (isAllMineCoverd && isAllTabsCleared) {
        clearInterval(timer);
        var msgW = document.querySelector('.modal')
        msgW.innerText = 'Winner!';
    }
}

function gameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                gBoard[i][j].isShown = true;
            }
        }
    }
    renderBoard(gBoard, '.board')
    clearInterval(timer)
};


function expandShown(gBoard, cellI, cellJ) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= gBoard.length) continue;
//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//             if (j < 0 || j >= gBoard[i].length) continue;
//             if (i === cellI && j === cellJ) continue;
//             console.log(gBoard[i][j]);
//             if (gBoard[i][j] === !gBoard[i][j].isShown) {
//                 gBoard[i][j].isShown = true;
//                 console.log('board[i][j]', gBoard[i][j]);

//                 renderBoard(gBoard, '.board');
//             }
//         }
//     }
    
 }


