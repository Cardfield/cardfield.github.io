var ballx = 300;
var bally = 300;
var ballSize = 40;
var score =0;
var gameState= "intro";

let cursor1, cursor2, cursor3;
let ballImgs = [];
let currentBallImg;
let bgIntro, bgL1, bgL2, bgL3, bgWin;

function preload() {
 cursor1 = loadImage('Chud.png');
  cursor2 = loadImage('Chud2.png');
  cursor3 = loadImage('Chud3.png');

 bgIntro = loadImage('CHUDintro.png');
  bgL1 = loadImage('level1bg.png');
  bgL2 = loadImage('level2bg.png');
  bgL3 = loadImage('level3bg.png');
  bgWin = loadImage('CHUDwin.png');

  ballImgs[0] = loadImage('burger.png');
  ballImgs[1] = loadImage('pizzaslice.png');
  ballImgs[2] = loadImage('ramen.png');
}
  
function setup() {
  createCanvas(600, 600);
  noCursor(); // hide default cursor
  textAlign(CENTER);
  textSize(20);
  imageMode(CENTER);
  currentBallImg = random(ballImgs);
} // end setup


function draw() {

 if (gameState === "L1") {
  image(bgL1, width/2, height/2, width, height);
}
else if (gameState === "L2") {
  image(bgL2, width/2, height/2, width, height);
}
else if (gameState === "L3") {
  image(bgL3, width/2, height/2, width, height);
}
else if (gameState === "intro") {
  image(bgIntro, width/2, height/2, width, height);
}
else if (gameState === "win") {
  image(bgWin, width/2, height/2, width, height);
}

  if (!currentBallImg) {
    currentBallImg = random(ballImgs);
  }

  if (gameState == "intro") levelIntro();
  else if (gameState == "L1") levelOne();
  else if (gameState == "L2") levelTwo();
  else if (gameState == "L3") levelThree();
  else if (gameState == "win") levelWin();

  // cursor LAST
  if (gameState == "L1") {
    image(cursor1, mouseX, mouseY, 96, 96);
  } else if (gameState == "L2") {
    image(cursor2, mouseX, mouseY, 110, 110);
  } else if (gameState == "L3") {
    image(cursor3, mouseX, mouseY, 130, 130);
  }
}

function levelIntro() {
  fill('white');
  textSize(85);
  textFont('Impact');
  text("CHUD", width/2, 200);
  
  textFont('verdana');
  textSize(20);
  text("press g to become a chud", width/2, 400);
}

function levelOne() {
  playLevel(5, "L2");
}

function levelTwo() {
  playLevel(10, "L3");
}

function levelThree() {
  playLevel(19, "win");
  ballSize = max(10, ballSize - 0.05);
}

function playLevel(targetScore, nextState) {

  textSize(20);
  fill(0);
  text("Score: " + score, width/2, 30);
   textSize(15);

  var distToBall = dist(ballx, bally, mouseX, mouseY);

  if (distToBall < ballSize/2) {
    ballx = random(width);
    bally = random(height);
    currentBallImg = random(ballImgs);
    score++;
  }

  if (score > targetScore) {
    gameState = nextState;
  }

  image(currentBallImg, ballx, bally, ballSize, ballSize);
}

function levelWin(){
  textSize(15);
  fill('white')
  text("Look at you! You successfully became a chud! press any key to restart", width/2, height-20);
  
}

 function keyPressed() {
  if (gameState === "intro" && key === 'g') {
    gameState = "L1";
  } 
  else if (gameState === "win") {
    score = 0;
    ballSize = 55;
    ballx = random(width);
    bally = random(height);
    gameState = "L1";
  }
}
