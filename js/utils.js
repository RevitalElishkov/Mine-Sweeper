function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}



// location such as: {i: 2, j: 7}
function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

var seconds = 0;
var minuts = 0;
var displaySeconds = 0;
var displayMinuts = 0;

function stopWatch() {

  seconds++;

  if (seconds / 60 === 1) {
    seconds = 0;
    minuts++
  }

  if (seconds < 10) {
    seconds = '0' + seconds.toString();
  } else displaySeconds;


  document.querySelector('.timer').innerHTML = `${minuts}:${seconds}`
}

