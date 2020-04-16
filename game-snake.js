sysBlocksize = 10;
sysWidth = 400;
sysHight = 400;

function isDeath(){
  if(sn1.isTail(sn1.x, sn1.y)){
    initSnake();
    return true;
  } 
  return false;
}

function isFoodOnSnake(){
  return sn1.isTail(fl1.x, fl1.y);
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
  snHeadx = constrain(random(0, sysWidth/sysBlocksize), 0, sysWidth);
  snHeady = constrain(random(0, sysHight/sysBlocksize), 0, sysHight);
  snBody= 10;

  sn1 = new snake(2);
  sn1.setBlockSize(sysBlocksize);
  sn1.setLocation(snHeadx, snHeady);
}

function initFood(){
  fl1 = new food(sysBlocksize);
  if(isFoodOnSnake()){
    fl1 = new food(sysBlocksize);
  }

  print("Create new flood at :" + fl1.x +", "+ fl1.y + ", [" + score +"]");
}

class food {
  constructor(size){
    this.bsize = size;

    this.x = int(random(0, 40))*sysBlocksize;
    this.y = int(random(0, 40))*sysBlocksize;
  }
  draw(){
    fill(color(255,0,0));
    rect(this.x, this.y, 10, 10);
  }
}
