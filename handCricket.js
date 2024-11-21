const BALL = '🥎';

function random(number) {
  return Math.floor(Math.random() * number) + 1;
}

function getTossResult(number) {
  return number === 1 ? 'head' : 'tail';
}

function wait(multipliyer) {
  for (let iterate = 0; iterate < multipliyer * 100000; iterate++) {};
}

function callToss() {
  console.clear();
  console.log(`--------------------------------------------------------------------------

@                                _                                 ,,
 \\\\   _   @'                    (_)                       .      _  \\\\
  \\\\_( )_//                    / Y |                   .      /--( )_//
    | Y/--                    /\   /               .        '//  \\~ \\
    |_/       _ / o"         ( _\ /            .                   - \\
  _ //\\      | | |    .       \\_\\\\\\        .                     //  \\\\--,
 /_// /      | | |      .    / \\ \\\\\\ .                           \\\\
/ // /_______|_|_|__________/_/_\\ \\_______________________________\\\\______
-------------------------------------------- Play Cricket ----------------`)
  console.log("\nGame cricket is starting....\n");
  const isHead = confirm("Have you chosen head ?");

  return getTossResult(isHead ? 1 : 2);
}

function flipCoin(number) {

}

function toss() {
  console.clear();
  const number = random(2);
  flipCoin(number);
  const tossResult = getTossResult(number);
  console.log("\nCoin is Flipped... \n\nAnd it is", tossResult);

  return tossResult;
}

function isPlayerChooseToBatFirst() {
  console.log("\nYou won the toss.\n");
  return confirm('Are you Batting First ? ');
}

function isAiChooseToBatFirst() {
  console.log("\nAi won the toss.");
  return random(2) === 1;
}

function winnerInTosschoose(isPlayerWonToss) {
  if (isPlayerWonToss) {
    return isPlayerChooseToBatFirst();
  }

  return isAiChooseToBatFirst();
}

function inningsStarting(isPlayerBatting) {
  const batting = isPlayerBatting ? 'Player' : 'Ai';
  console.log('\n' + batting, 'will bat now\n');
  return batting;
}

function isOut(batter, baller, batterHit, ballerBall) {
  console.clear();
  console.log('\n' + batter, 'ready to hit a', batterHit);
  console.log(baller, 'balled for a', ballerBall, '\n');

  if (ballerBall === batterHit) {
    console.log(batter, 'got out\n');
    return true;
  }

  return false;
}

function playerBatting(target) {
  if (target < 0) {
    return 0;
  }

  const playerWantToHit = +prompt("You want to hit : ");

  if (playerWantToHit > 6 || playerWantToHit < 0) {
    return playerBatting(target);
  }

  const aiBalled = random(7) - 1;

  if (isOut('Player', 'Ai', playerWantToHit, aiBalled)) {
    return 0;
  }

  return playerWantToHit + playerBatting(target - playerWantToHit);
}

function aiBatting(target) {
  if (target < 0) {
    return 0;
  }
  
  const playerWantToBallFor = +prompt("You want to ball For : ");

  if (playerWantToBallFor > 6 || playerWantToBallFor < 0) {
    return aiBatting(target);
  }

  const aiHit = random(7) - 1;

  if (isOut('Ai', 'Player', aiHit, playerWantToBallFor)) {
    return 0;
  }

  return aiHit + aiBatting(target - aiHit);
}

function inningsStart(batting, target) {
  if (batting === 'Player') {
    return playerBatting(target);
  }

  return aiBatting(target);
}

function winMessage(first, last, firstScored, lastScored) {
  if (firstScored === lastScored) {
    console.log("It is a draw");
  }

  const winner = firstScored > lastScored ? first : last;
  const difference = Math.abs(firstScored - lastScored);

  console.log('\n' + winner, 'won by', difference, 'run');
}

function startGame() {
  const userCall = callToss();
  const tossResult = toss();
  const isPlayerWonToss = userCall === tossResult;
  const isPlayerBattingFirst = winnerInTosschoose(isPlayerWonToss);

  const battingFirst = inningsStarting(isPlayerBattingFirst);
  const firstBatterScored = inningsStart(battingFirst, Infinity);
  console.log(battingFirst, "Scored", firstBatterScored);

  const battingLast = inningsStarting(!isPlayerBattingFirst);
  const lastBatterScored = inningsStart(battingLast, firstBatterScored);
  console.log(battingLast, "Scored", lastBatterScored);

  winMessage(battingFirst, battingLast, firstBatterScored, lastBatterScored);
}

startGame();
