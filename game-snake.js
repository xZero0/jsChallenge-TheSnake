
sysTotalBlock = 60;
sysBlocksize = 10;
sysWidth = 500;
sysWidth = 500;
sysBonusFag = 0;
sysC19Fag = 0;
sysOverGame = 0;

function setup() {
  var w = innerWidth;
  var h = innerHeight;

  sysOverGame = 1;
  
  if(w > h){
    sysWidth = h;
    sysHeight = h;
  } else {
    sysWidth = w;
    sysHeight = w;
  }

  sysBlocksize = 10*window.devicePixelRatio;
  if(sysWidth/sysBlocksize > 60){
    sysWidth = 600;
    sysHeight = 600;
  }

  sysTotalBlock = sysWidth/sysBlocksize;

  canvas = createCanvas(sysWidth, sysHeight);
  canvas.parent('sketch-div');
  frameRate(10);

  score = 0;
  maxscore = 0;

  initSnake();
  initFood();
  initBonusFood();
  initCovidFood();
}

function draw() {
  background(40);

  sn1.draw();
  fl1.draw();
  if(sysBonusFag == 2){
    bo1.draw();
  }
  if(sysC19Fag == 2){
    c19.draw();
  }


  if(sn1.getFood(fl1)){
    score = score + fl1.score;
    sn1.heal(fl1.score*10);
    initFood();
  }

  if(sysBonusFag == 2){
    if(sn1.getFood(bo1)){
      score = score + bo1.score;
      sn1.heal(bo1.score*50);
      initBonusFood();
    }
  }

  if(sysC19Fag == 2){
    if(sn1.getFood(c19)){
      score = score + c19.score;
      sn1.setInfection();
      initCovidFood();
    }
  }

  updateBonus();
  updateCovid();

  updateLabels(score);

  checkOutScreen();
  checkLavel();

  checkDeath();
  sn1.update();
}

function checkDeath(){
  var x = sn1.x;
  var y = sn1.y;

  if(sysOverGame > 0){
    //gameOver();
    sysOverGame = 0;
  }

  if(sn1.isTail(x, y)){
    gameOver();
  } 

  if(sn1.infect > 200){
    gameOver();
  }
}

function gameOver(){
  noLoop();
}
function isFoodOnSnake(inf){
  return sn1.isTail(inf.x, inf.y);
}

function checkOutScreen(){
  if(sn1.x < 0){
    sn1.setLocation(sysWidth-sysBlocksize, sn1.y);
  } else if (sn1.x > sysWidth-sysBlocksize){
    sn1.setLocation(0, sn1.y);
  }

  if(sn1.y < 0){
    sn1.setLocation(sn1.x, sysWidth-sysBlocksize);
  } else if (sn1.y > sysWidth-sysBlocksize){
    sn1.setLocation(sn1.x, 0);
  }
}

function checkLavel(){
  if(score >= 10){
    frameRate(11);
  } else if(score >= 20){
    frameRate(15);
  } else if(score >= 50){
    frameRate(20);
  } else if(score >= 100){
    frameRate(25);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sn1.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    sn1.move(1, 0);
  } else if (keyCode === UP_ARROW) {
    sn1.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    sn1.move(0, 1);
  } else if (keyCode === 190) { //Clockwise play by '.' ( > key)
    sn1.movec();
  } else if (keyCode === 32) { //Clockwise play by ' ' or space bar
    sn1.movec();
  } else if (keyCode === 188) { //Counter clockwise play by ',' ( < key)
    sn1.movecc();
  }
}

//Clockwise play by mouseClicked
function mouseClicked() {
  sn1.movec();
}

function initSnake(){
  snHeadx = int(random(0, sysTotalBlock)*sysBlocksize);
  snHeady = int(random(0, sysTotalBlock)*sysBlocksize);

  sn1 = new snake();
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);
  sn1.infect = 0;

  if(score > maxscore){
    maxscore = score;
  }
  score = 0;
}

function initFood(){
  fl1 = new food(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake(fl1)){
    fl1 = new food(sysTotalBlock, sysBlocksize);
  }
}

function initBonusFood(){  
  bo1 = new bonusfood(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake(bo1)){
    bo1 = new bonusfood(sysTotalBlock, sysBlocksize);
  }
  bo1.time = int(random(80,120));
  sysBonusFag = 1;
}

function initCovidFood(){
  c19 = new covid19food(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake(c19)){
    c19 = new covid19food(sysTotalBlock, sysBlocksize);
  }
  c19.time = int(random(120,140));
  sysC19Fag = 1;
}

function updateBonus(){
  if(score > 1) {
    if(bo1.time == 60){
      sysBonusFag = 2;
    } else if(bo1.time == 0){
      initBonusFood();
    }

    bo1.time = bo1.time - 1;
  } 
}

function updateCovid(){
  if(score > 1) {
    if(c19.time == 60){
      sysC19Fag = 2;
    } else if(c19.time == 0){
      initCovidFood();
    }

    c19.time = c19.time - 1;
  } 
}

