let walker;
const canvasWidth=800;
const canvasHeight=canvasWidth;
let delayCounter = 0
let hueCounter = 0

function setup() {
  walker = new Walker();
  prefferedXDirection = 1;

  background(100);
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = canvasWidth / 2.0;
    this.y = canvasHeight / 2.0;
  }
  show() {
    delayCounter++;
    if(delayCounter > 8) {
      if(hueCounter > 360) {
        hueCounter = 0;
      }
      else {
        hueCounter++;
      }
      
      //stroke("black");
  
    colorMode(HSB, 360,100,100,1);
    //noFill();
  strokeWeight(4);
  stroke(hueCounter, 100, 100, 90);
    //strokeWeight(1);
    circle(this.x, this.y,random(80));
    delayCounter = 0;
    }
    
  }

  correctedCoordinate(currentCoordinate, canvaseBorder) {
    let correctedCoordinate = currentCoordinate;
    if(currentCoordinate <= 0 || currentCoordinate >= canvaseBorder) {
      if(currentCoordinate < 0) {
        correctedCoordinate = canvaseBorder;
      }
      else {
        correctedCoordinate = 0;
      }
    }
    return correctedCoordinate;
  }
  
  step() {
    let positiveX = true;
    if (mouseX - this.x < 0) {
      positiveX = false;
    }
    let positiveY = true;
    if (mouseY - this.y < 0) {
      positiveY = false;
    }
    let diffX = abs(mouseX - this.x);    
    let diffY = abs(mouseY - this.y);
    let powX = pow(diffX,2);
    let powY = pow(diffY,2);
    let powZ = powX + powY;
    let fractionX = powX / powZ;
    let fractionY = powY / powZ;


    let probabilityMinusX = 0.1;
    let probabilityPlusX = 0.1;
    if(!positiveX) {
      
      probabilityMinusX += fractionX * 0.5;
    }
    else {
      
      probabilityPlusX += fractionX*0.5;
    }
    let probabilityMinusY = 0.1;
    let probabilityPlusY = 0.1;
    if(!positiveY) {
      probabilityMinusY += fractionY * 0.5;
    }
    else {
      probabilityPlusY += fractionY*0.5;
    }

    // prevent point from leaving the canvas by wrapping around
    this.x = this.correctedCoordinate(this.x, canvasWidth);
    this.y = this.correctedCoordinate(this.y, canvasHeight);
    const stepSize = 8;
    // do the actual random walk
    let choice = (random(1));
    if(choice < probabilityPlusX) {
      this.x+=stepSize;
    }
    else if(choice<probabilityMinusX+probabilityPlusX) {
      this.x-=stepSize;
    }
    else if (choice<probabilityPlusY+probabilityMinusX+probabilityPlusX) {      
      this.y+=stepSize;
    }
    else {      
      this.y-=stepSize;
    }
  }
}