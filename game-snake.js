
sysTotalBlock = 60;
sysBlocksize = 10;
sysWidth = 500;
sysWidth = 500;


function setup() {
  var w = innerWidth;
  var h = innerHeight;
  
  if(w > h){
    sysWidth = h;
    sysHeight = h;
  } else {
    sysWidth = w;
    sysHeight = w;
  }

  if(sysWidth > 600){
    sysWidth = 600;
    sysHeight = 600;
  }

  sysBlocksize = sysWidth/sysTotalBlock;

  canvas = createCanvas(sysWidth, sysHeight);
  canvas.parent('sketch-div');
  frameRate(10);

  score = 0;
  maxscore = 0;

  initSnake(sysBlocksize);
  initFood(sysBlocksize);
}

function draw() {
  background(40);

  sn1.draw();
  fl1.draw();

  if(sn1.getFood(fl1)){
    score = score + fl1.score;
    initFood(sysBlocksize);
  }

  updateLabels(score);

  checkOutScreen();
  checkLavel();

  checkDeath();
  sn1.update();
}

function checkDeath(){
  var x = sn1.x;
  var y = sn1.y;
  if(sn1.isTail(x, y)){
    initSnake();
  } 
}

function isFoodOnSnake(){
  return sn1.isTail(fl1.x, fl1.y);
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
  } else if (keyCode === 32) {
    sn1.movec();
  }
}

function initSnake(){
  snHeadx = int(random(0, sysTotalBlock)*sysBlocksize);
  snHeady = int(random(0, sysTotalBlock)*sysBlocksize);

  sn1 = new snake();
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);

  if(score > maxscore){
    maxscore = score;
  }
  score = 0;
}

function initFood(){
  fl1 = new food(sysTotalBlock, sysBlocksize);
  if(isFoodOnSnake()){
    fl1 = new food(sysTotalBlock, sysBlocksize);
  }
}

class food {
  constructor(totalblock, blocksize){
    this.bsize = blocksize;
    this.score = 1;

    this.x = int(random(0, totalblock-1))*this.bsize;
    this.y = int(random(0, totalblock-1))*this.bsize;
  }

  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, this.bsize, this.bsize);
  }
}
