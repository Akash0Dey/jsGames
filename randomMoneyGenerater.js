const plus = '┼';
const top = '─';
const side = '│';
const SPACE = ' '
const player1 = "Player 1";
const player2 = "Player 2";
const player3 = "Player 3";
const player4 = "Player 4";

let player1Money = 0;
let player2Money = 0;
let player3Money = 0;
let player4Money = 0;

let player1Multiplexer = 1;
let player2Multiplexer = 1;
let player3Multiplexer = 1;
let player4Multiplexer = 1;

function random(number) {
  return Math.floor(Math.random() * number) + 4;
}

function widing(word, wide, character) {
  if (wide - word.length === 0) {
    return word;
  }

  if (wide - word.length === 1) {
    return word + character;
  }

  return widing(character + word + character, wide, character);
}

function header(box, noOfBox, wide, character, separator) {
  if (noOfBox < 1) {
    return '';
  }

  return widing(box, wide - 1, character) + separator + header(box, noOfBox - 1, wide, character, separator);
}

function table(n = 4) {
  const wide = 12;
  let box = plus + header('', n + 1, wide, top, plus) + '\n';

  box +=  side + header("Name", 1, wide, SPACE, side); 
  box += header(player1, 1, wide, SPACE, side); 
  box += header(player2, 1, wide, SPACE, side) ;
  box += header(player3, 1, wide, SPACE, side); 
  box += header(player4, 1, wide, SPACE, side) + '\n';

  box += plus + header('', n + 1, wide, top, plus) + '\n';

  box +=  side + header("Money", 1, wide, SPACE, side); 
  box += header(player1Money, 1, wide, SPACE, side); 
  box += header(player2Money, 1, wide, SPACE, side) ;
  box += header(player3Money, 1, wide, SPACE, side); 
  box += header(player4Money, 1, wide, SPACE, side) + '\n';
  
  box += plus + header('', n + 1, wide, top, plus) + '\n';

  box +=  side + header("Multiplexer", 1, wide, SPACE, side); 
  box += header(player1Multiplexer, 1, wide, SPACE, side); 
  box += header(player2Multiplexer, 1, wide, SPACE, side) ;
  box += header(player3Multiplexer, 1, wide, SPACE, side); 
  box += header(player4Multiplexer, 1, wide, SPACE, side) + '\n';

  box += plus + header('', n + 1, wide, top, plus) + '\n';
  console.log(box);
}

function randomMoneyGenerator() {
  player1Money += random(5 * player1Multiplexer);
  player2Money += random(5 * player2Multiplexer);
  player3Money += random(5 * player3Multiplexer);
  player4Money += random(5 * player4Multiplexer);

  table();
}

function generateMoney() {
  
  if (confirm("Press y and enter to quit : ")) {
    return
  }
  console.clear();

  randomMoneyGenerator();
  return generateMoney();
}

table();
generateMoney(5);
