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
  
  function getRandomIntInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }



//   ריך להגדיר את GtimeStart n מתי שאתה מתחיל לספור את הזמן וגם להגדיר Interval
//   gStartTime = Date.now();
//           gGameIntervalId = setInterval(updateTimer, 16);

//   function updateTimer() {
//     var timeDiff = Date.now() - gStartTime;
//     var seconds = parseInt(timeDiff / 1000);
//     var timeDiffStr = timeDiff.toString();
//     var ms = timeDiffStr.substring(timeDiffStr.length - 3);
//     if (ms.length < 2) {
//         ms = `00${ms}`;
//     } else if (ms.length < 3) {
//         ms = `0${ms}`;
//     }
//     if (seconds < 10) seconds = `0${seconds}`;
//     document.querySelector('.time .value').innerText = `${seconds}.${ms}`
// }