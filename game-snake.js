sysBlocksize = 10;
sysWidth = 400;
sysHight = 400;

snArray = [];

function setup() {
  createCanvas(sysWidth, sysHight);
  frameRate(10);

  initSnake(sysBlocksize);
  initFood(sysBlocksize);
}

function draw() {
  background(40);

  sn1.draw();
  sn1.update();

  fl1.draw();

  if(sn1.getFood(fl1)){
    fl1 = new food(sysBlocksize);
  }

  isOutScreen();
  isDeath();
}

function isDeath(){
  for(let i=0; i < sn1.tail.length; i++){
    if(dist(sn1.x, sn1.y, sn1.tail[i].x, sn1.tail[i].y) < sysBlocksize){
      initSnake();
    } 
  }
}

function isOutScreen(){
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

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    sn1.move(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    sn1.move(1, 0);
  } else if (keyCode === UP_ARROW) {
    sn1.move(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    sn1.move(0, 1);
  }
}

function initSnake(){
  snHeadx = int(random(0, 400)/sysBlocksize);
  snHeady = int(random(0, 400)/sysBlocksize);
  snBody= 10;

  sn1 = new snake(2);
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);
}

function initFood(){
  fl1 = new food(sysBlocksize);
}

class food {
  constructor(size){
    this.bsize = size;

    this.x = int(random(0, 40)*size);
    this.y = int(random(0, 40)*size);
    print("Create new flood at :" + this.x +", "+this.y);
  }
  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, 10, 10);
  }
}
