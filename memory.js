const plus = '┼';
const top = '─';
const side = '│';
const SPACE = ' ';
const smiley = '😀';
const worried = '😅';
const lol = '😂';
const cool = '😎';
const congrat = '🥳';
const hot = '🥵';
const freze = '🥶';
const lier = '🤥';
const tile = '🟨';
let first1 = 0;
let first2 = 0;
let second1 = 0;
let second2 = 0;
let third1 = 0;
let third2 = 0;
let fourth1 = 0;
let fourth2 = 0;
let lastEntry = 0;
let flippedCard = "00000000";
let move = 0;


function random(number) {
  return Math.floor(Math.random() * number) + 1;
}

function wait(multipliyer) {
  for (let iterate = 0; iterate < multipliyer * 100000; iterate++) {};
}

function newRandom(number, string) {
  const num = random(number);

  for (let index = 0; index < string.length; index++) {
    if ('' + num === string[index]) {
      return newRandom(number, string);
    }
  }

  return num;
}

function flipCard(position, value = 1) {
  let updateCard = '';

  for (let index = 0; index < flippedCard.length; index++) {
    updateCard += index === position - 1 ? value : flippedCard[index];
  }

  flippedCard = updateCard;
}

function emojiPosition(position) {
  if (position === first1 || position === first2) {
    return cool;
  }
  
  if (position === second1 || position === second2) {
    return lol;
  }
  
  if (position === third1 || position === third2) {
    return hot;
  }
  
  return freze;
}

function showEmoji(n, row) {
  const position = (4 - n + 1) + (4 * row);
  const emoji = emojiPosition(position);

  return flippedCard[position - 1] === '0' ? tile : emoji;
}

function adjustString(word, wide, character) {
  if (wide - word.length === 0) {
    return word;
  }

  if (wide - word.length === 1) {
    return word + character;
  }

  return adjustString(character + word + character, wide, character);
}

function lineMaker(n, wide) {
  if (n < 1) {
    return '';
  }

  return adjustString('', wide, top) + plus + lineMaker(n - 1, wide);
}

function drawMid(n, wide, row) {
  if (n < 1) {
    return '';
  }

  return adjustString(showEmoji(n, row), wide, SPACE) + side + drawMid(n - 1, wide, row);
}

function flippingCard(position) {
  flipCard(position, 1);
  move++;

  if (lastEntry === 0) {
    lastEntry = position;
  } else {
    const isSame = emojiPosition(position) === emojiPosition(lastEntry);

    if (!isSame) {
      updateBoard(2, 4, 2);
      wait(20000);
      flipCard(position, 0);
      flipCard(lastEntry, 0);
    }

    lastEntry = 0;
  }  
}

function randomTile() {
  let takenNum = '';
  first1 = random(8);
  takenNum += first1;
  first2 = newRandom(8, takenNum);
  takenNum += first2;
  second1 = newRandom(8, takenNum);
  takenNum += second1;
  second2 = newRandom(8, takenNum);
  takenNum += second2;
  third1 = newRandom(8, takenNum);
  takenNum += third1;
  third2 = newRandom(8, takenNum);
  takenNum += third2;
  fourth1 = newRandom(8, takenNum);
  takenNum += fourth1;
  fourth2 = newRandom(8, takenNum);
}

function topPositionReference(wide, gap) {
  let top = adjustString('', gap, SPACE) + side;
  top += adjustString('1️⃣', wide + 2, SPACE) + side;
  top += adjustString('2️⃣', wide + 2, SPACE) + side;
  top += adjustString('3️⃣', wide + 2, SPACE) + side;
  top += adjustString('4️⃣', wide + 2, SPACE) + side;

  return top;
}

function bottomPositionReference(wide, gap) {
  let top = adjustString('', gap, SPACE) + side;
  top += adjustString('5️⃣', wide + 2, SPACE) + side;
  top += adjustString('6️⃣', wide + 2, SPACE) + side;
  top += adjustString('7️⃣', wide + 2, SPACE) + side;
  top += adjustString('8️⃣', wide + 2, SPACE) + side;

  return top;
}

function updateBoard(r = 3, c = 3, gap = 16) {
  const wide = 4;
  const divider = adjustString('', gap, SPACE) + plus + lineMaker(c, wide);
  let gameBoard = "Press 10 to quit.  Score : " + (100 - move) + '\n\n';
  gameBoard += topPositionReference(wide, gap) + ' \n' + divider;
  
  for (let row = 0; row < r; row++) {
    const middle = adjustString('', gap, SPACE) + side + drawMid(c, wide, row);
    gameBoard += '\n' + middle;
    gameBoard += '\n' + divider;
  }
  
  gameBoard += '\n' + bottomPositionReference(wide, gap) + '\n';
  console.clear();
  console.log(gameBoard);
}

function startGame() {
  flippedCard = '00000000';
  randomTile();
  let wantToQuit = false;
  
  while (flippedCard !== '11111111' && !wantToQuit) {
    updateBoard(2, 4, 2);
    const position = +prompt(" position : " );
    wantToQuit = position === 10;
    
    if (flippedCard[position - 1] !== '0' || position < 1 || position > 10) {
      continue;
    }
    
    flippingCard(position);
  }
  
  updateBoard(2, 4, 2);
}

startGame();
