const container = document.getElementById('container');
const squares = document.getElementsByClassName('square');
const clearButton = document.getElementById('clear');
const resizeButton = document.getElementById('resize');
const rainbowButton = document.getElementById('rainbow');
const shadedButton = document.getElementById('shaded');
const defaultButton = document.getElementById('black');

let squarePerLine = 16;
gridCreator(squarePerLine, 'black');
let filling = '';

function gridCreator(squarePerLine, filling) {

  container.style.display = 'grid';
  container.style.gridTemplateColumns = `repeat(${squarePerLine}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${squarePerLine}, 1fr)`;
  container.style.marginLeft = 'auto';
  container.style.marginRight = 'auto';
  container.style.width = '72vh';
  container.style.height = '72vh';
  container.style.border = '6px solid black';
  container.style.backgroundColor = 'white';
  container.style.cursor = 'crosshair';

  for (i = 0; i < squarePerLine * squarePerLine; i++) {
    var div = document.createElement('div');
    document.getElementById('container').appendChild(div);
    div.className = 'square';
    if (filling === 'grayscale') {
      squares[i].style.opacity = '0';
      squares[i].style.backgroundColor = 'black';
    }
  }

  for (i = 0; i < squares.length; i++) {
    squares[i].style.border = 'none';
    squares[i].addEventListener('mouseenter', (e) => {
      if (filling === 'rainbow') {
        e.currentTarget.style.backgroundColor = getRandomColor();
        e.currentTarget.style.transitionDuration = '0.1s';
      } else if (filling === 'grayscale') {
        let opacity = Number(e.currentTarget.style.opacity);
        opacity += 0.1;
        if (opacity >= '1') opacity = 1;
        e.currentTarget.style.opacity = `${opacity}`;
        e.currentTarget.style.transitionDuration = '0.1s';
      } else if (filling === 'black') {
        e.currentTarget.style.backgroundColor = 'black';
        e.currentTarget.style.transitionDuration = '0.1s';
      }
    })
  }
}

shadedButton.addEventListener('click', () => {
  clearGrid();
  filling = 'grayscale';
  squarePerLine = visitorInput()
  gridCreator(squarePerLine, filling);
})

rainbowButton.addEventListener('click', () => {
  clearGrid();
  filling = 'rainbow';
  squarePerLine = visitorInput()
  gridCreator(squarePerLine, filling);
})

defaultButton.addEventListener('click', () => {
  clearGrid();
  filling = 'black';
  squarePerLine = visitorInput()
  gridCreator(squarePerLine, filling);
})

clearButton.addEventListener('click', () => {
  clearGrid();
  if (filling === '') {
    filling = 'black';
  }
  gridCreator(squarePerLine, filling);
})

resizeButton.addEventListener('click', () => {
  clearGrid();
  if (filling === '') {
    filling = 'black';
  }
  squarePerLine = visitorInput()
  gridCreator(squarePerLine, filling);
})

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearGrid() {
  while (squares.length > 0) {
    squares[0].remove();
  }
}

function visitorInput() {
  let input = prompt('Number of squares per row or column:');
  return input;
}