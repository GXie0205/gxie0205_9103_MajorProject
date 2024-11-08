// Global variables
let minSide; 
let daytime = true;
let bg = 220;
let secondSegStart;
let secondSegWidth;
let thirdSegStart;
let thirdSegWidth;
let fourthSegStart;
let fourthSegWidth;
let minHeight;
let maxHeight;
let rectWidth;
let rectHeight;
let red = [206, 29, 29];
let blue = [21, 33, 173];
let yellow = [255, 196, 31];
let rects1 = [];
let rects2 = [];
let rects3 = [];
let rects4 = [];
let lights = [];
let numLights = 40;
let lightDelay = 60;
let ligthStart;

function fillColour(colour, alpha) { // Fills colour based on inputted colour name
  let a = alpha ?? 255;
  switch(colour) {
    case "red":
      fill(red[0], red[1], red[2], a);
      break;
    case "blue":
      fill(blue[0], blue[1], blue[2], a);
      break;
    case "yellow":
      fill(yellow[0], yellow[1], yellow[2], a);
      break;
    case "white":
      fill(255, a);
      break;
    case "black":
      fill(0, a);
      break;
  }
}

function drawRect1(x, y, w, h, c, m) { // initialises rectangles for first building
  rects1.push(new ChangeRect(x, y, w, h, c, m));
}

function drawRect2(x, y, w, h, c, m) { // initialises rectangles for second building
  rects2.push(new ChangeRect(x, y, w, h, c, m));
}

function drawRect3(x, y, w, h, c, m) { // initialises rectangles for third building
  rects3.push(new ChangeRect(x, y, w, h, c, m));
}

function drawRect4(x, y, w, h, c, m) { // initialises rectangles for fourth building
  rects4.push(new ChangeRect(x, y, w, h, c, m));
}

function minDimension() { // determines if width or height is the smaller side of the canvas
  if (width > height) {
    minSide = height;
  } else {
    minSide = width;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  minDimension();
  secondSegStart = width / 4;  
  secondSegWidth = width / 2 - secondSegStart;  
  thirdSegStart = width / 2;  
  thirdSegWidth = width / 4 * 3 - thirdSegStart;
  fourthSegStart = width / 4 * 3;
  fourthSegWidth = width - fourthSegStart;
  minHeight = height/4;
  maxHeight = height - minHeight;
  rectWidth = thirdSegWidth/40;
  rectHeight = maxHeight/80;

  // Initalise all light objects
  for (let i = 0; i < numLights; i++) {
    lights.push(new LightPulse());
  }

  // Initialise all building objects
  drawFirstBuilding();
  drawSecondBuilding();
  drawThirdBuilding();
  drawFourthBuilding();
}

function draw() {
  if (daytime == true) {
    bg = lerp(bg, 220, 0.02);
  } else {
    bg = lerp(bg, 0, 0.03);
  }
  background(bg);

  // Draw light objects
  rectMode(CENTER); // light objects drawn using center of rectangle
  if (daytime == false) {
    if (frameCount >= lightStart + lightDelay) { // provide some delay before lights start so that sky is darker
      for (let i = 0; i < lights.length; i++) {
        lights[i].update();
        lights[i].draw();
      }
    }
  }
  rectMode(CORNER); // remainder of buildings drawing using the top left corner

  // Draw buildings
  // Building 1
  for (let i = 0; i < rects1.length; i++) {
    rects1[i].update();
    rects1[i].draw();
  }

  // Building 2
  push();
  translate(secondSegStart, 0);
  for (let i = 0; i < rects2.length; i++) {
    rects2[i].update();
    rects2[i].draw();
  }
  pop();

  // Building 3
  push();
  translate(thirdSegStart, 0); // sets start of canvas to third quarter of the screen
  for (let i = 0; i < rects3.length; i++) {
    rects3[i].update();
    rects3[i].draw();
  }
  pop();

  // Building 4
  push();
  translate(fourthSegStart, 0); // sets start of canvas to third quarter of the screen
  for (let i = 0; i < rects4.length; i++) {
    rects4[i].update();
    rects4[i].draw();
  }
  pop();

  // Yellow floor
  fillColour("yellow");
  rect(0, height-rectHeight*2, width, rectHeight*2);
}

// Building functions to setup
function drawFirstBuilding() {
  // Bottom layer
  drawRect1(24,10,6,10,"white");
  drawRect1(14,9,12,9,"red");
  drawRect1(16,19,2,12,"red");
  drawRect1(7,17,4,17,"white");
  drawRect1(12,7,6,7,"white");
  drawRect1(1,11,10,11,"blue");
  drawRect1(19,20,5,8,"blue");
  drawRect1(30,36,6,36,"blue");
  drawRect1(33.5,9,1.5,9,"red");
  drawRect1(33.5,6,1,1,"yellow");
  drawRect1(24,20,8,8,"white");
  drawRect1(11,18,1,18,"yellow", false);
  drawRect1(15,12,18,3,"yellow", false);
  drawRect1(35,9,0.25,7,"black");
  drawRect1(30,9,0.5,7,"black");
  drawRect1(18,7,0.5,5,"black");

  // Middle layer
  drawRect1(35,41,4,18,"white");
  drawRect1(30,36,6,13,"blue");
  drawRect1(36,38,1,15,"yellow", false);
  drawRect1(29,53,2,30,"yellow", false);
  drawRect1(24,50,6,27,"blue");
  drawRect1(30,50,0.25,27,"black");
  drawRect1(26,38,2,0.5,"black");
  drawRect1(26,42,2,4,"yellow");
  drawRect1(7,33,17,11,"white");
  drawRect1(28,30,4,7,"red");
  drawRect1(30,25.5,1.5,0.25,"black");
  drawRect1(30,28,1.5,2.5,"yellow");
  drawRect1(4,23,36,3,"yellow", false);
  drawRect1(18,25,2,25,"yellow", false);
  drawRect1(4,20,36,1,"black", false);
  drawRect1(20,25,0.5,2,"black", false);
  drawRect1(20,20,0.5,8,"black", false);
  drawRect1(20,8,0.5,6,"black", false);
  drawRect1(15,9,18,1,"black", false);
  drawRect1(32,20,0.5,8,"black");

  // Top layer
  drawRect1(4.5,42,6.5,7,"white");
  drawRect1(0.5,35,27.5,2,"yellow", false);
  drawRect1(11,48,2,13,"yellow", false);
  drawRect1(16,64,8,29,"red");
  drawRect1(20,54,2,0.5,"black");
  drawRect1(20,59,2,5,"yellow");
  drawRect1(23.5,59,1.5,36,"yellow", false);
  drawRect1(0.5,33,23,1,"black", false);
  drawRect1(25,33,3,1,"black", false);
  drawRect1(37,38,0.5,15,"black", false);
  drawRect1(32,30,0.25,7,"black");

  // Yellow floor
  drawRect1(0,2,39,2,"yellow", false);
}

function drawSecondBuilding() {  
  drawRect2(18, 4, 23, 4, "red");   
  
  //White
  drawRect2(0, 7, 27, 3.8, "white");   
  drawRect2(0, 19, 6, 12, "white");   
  drawRect2(0, 35, 17, 7, "white");    
  drawRect2(33, 20, 5, 7, "white");   
  drawRect2(24, 76, 6, 63, "white"); 
  drawRect2(18, 72, 1.5, 60, "white");

  // Yellow
  drawRect2(3, 1.5, 37, 1.5, "yellow", false);   
  drawRect2(0, 7, 25, 1, "yellow", false);   
  drawRect2(9, 13.5, 20, 2.5, "yellow", false); 
  drawRect2(1, 22, 16, 2, "yellow", false);  
  drawRect2(11, 36, 6, 1, "yellow", false);  
  drawRect2(17, 69, 1.5, 69, "yellow", false); 
  drawRect2(20, 28, 18, 2.5, "yellow", false); 
 
  // Blue
  drawRect2(6, 69, 6, 47, "blue");
  drawRect2(3, 11, 3, 4, "blue"); 
  drawRect2(7, 11, 9, 4, "blue");
  drawRect2(22, 63, 3, 50, "blue");
  drawRect2(32, 48, 3, 20, "blue");
  drawRect2(18.6, 10.5, 10, 3.2, "blue"); 
  drawRect2(28, 24, 6, 20, "blue"); 

  // Red
  drawRect2(14, 69, 3, 33, "red");    
  drawRect2(0, 19, 15, 6, "red"); 
  drawRect2(20, 66, 2, 45, "red");
  drawRect2(28, 38, 4, 10, "red");    

  // Other Yellow
  drawRect2(7.5, 66, 3, 6, "yellow"); 
  drawRect2(9, 32, 5, 10, "yellow", false);
  drawRect2(12, 18, 2, 4, "yellow"); 
  drawRect2(28.5, 37, 3, 2, "yellow"); 
  drawRect2(29.5, 9, 3, 5, "yellow");

  // black shadows
  drawRect2(13, 32, 1, 10, "black", false);  
  drawRect2(15, 19, 0.5, 6, "black"); 
  drawRect2(15, 11, 1, 4, "black"); 
  drawRect2(17, 69, 0.5, 33, "black", false);
  drawRect2(19.5, 72, 0.5, 51, "black");
  drawRect2(25, 63, 0.5, 50, "black");
  drawRect2(35, 48, 0.5, 20, "black", false);
  drawRect2(33, 24, 1, 20, "black");
  drawRect2(0, 6, 19, 0.5, "black", false);

}

function drawThirdBuilding() {
  
  // Bottom layer
  drawRect3(6, 20, 3, 20, "white");
  drawRect3(4, 20, 2, 20, "yellow", false);
  drawRect3(2, 8, 5, 5, "blue");
  drawRect3(8, 20, 12, 20, "blue");
  drawRect3(9, 16, 4, 11, "red");
  drawRect3(20, 20, 1, 8, "yellow", false);
  drawRect3(21, 20, 9, 8, "red");
  drawRect3(20, 12, 18, 12, "white");
  drawRect3(26, 17, 10, 8, "blue");
  drawRect3(27, 15, 6, 2, "yellow");
  drawRect3(1, 22, 33, 2, "black", false);
  drawRect3(19, 20, 1, 20, "black", false);

  // Middle layer
  drawRect3(8, 54, 8, 7, "red");
  drawRect3(17, 54, 14, 21, "blue");
  drawRect3(31, 46, 5, 13, "red");
  drawRect3(23, 53, 6, 6, "red");
  drawRect3(25, 51, 2, 2, "yellow");
  drawRect3(5, 43, 17, 19, "white");
  drawRect3(26, 33, 7, 8, "white");
  drawRect3(2, 39, 8, 14, "red");
  drawRect3(12, 42, 3, 14, "blue");
  drawRect3(7, 42, 1, 17, "yellow", false);
  drawRect3(10, 42, 1, 17, "yellow", false);
  drawRect3(22, 33, 4, 9, "yellow", false);
  drawRect3(1, 25, 33, 3, "yellow", false);
  drawRect3(16, 54, 1, 7, "black", false);
  drawRect3(7, 55, 32, 1, "black", false);
  drawRect3(4, 43, 13, 1, "black", false);
  drawRect3(4, 47, 13, 4, "yellow", false);

  // Top layer
  drawRect3(3, 66, 22, 9, "blue");
  drawRect3(27, 67, 9, 10, "white");
  drawRect3(1, 75, 19, 13, "white");
  drawRect3(10, 71, 5, 9, "blue");
  drawRect3(3, 79, 5, 8, "red");
  drawRect3(5, 77, 3, 2, "yellow");
  drawRect3(7, 77, 10, 3, "red");
  drawRect3(23, 80, 9, 9, "red");
  drawRect3(22, 68, 16, 1, "black", false);
  drawRect3(7, 57, 32, 2, "yellow", false);
  drawRect3(22, 71, 16, 3, "yellow", false);
  drawRect3(24, 68, 2, 11, "yellow", false);
  
  // Yellow floor
  drawRect3(0, 3, 40, 3, "yellow", false);
  
}

function drawFourthBuilding() {

  //bottom layer
  drawRect4(2, 16, 12, 15, "red");
  drawRect4(17, 14, 11, 13, "blue");
  drawRect4(8, 8, 18, 7, "white");
  drawRect4(5, 6, 5, 5, "yellow", false);
  drawRect4(22, 7, 2, 6, "red");
  drawRect4(24, 9, 5, 8, "white");
  drawRect4(24, 7, 14, 6, "blue");
  drawRect4(34, 6, 3, 2, "yellow");

  //second layer
  drawRect4(3, 25, 9, 8, "white");
  drawRect4(12, 27, 6, 10, "blue");
  drawRect4(15, 22, 12, 5, "white");
  drawRect4(28, 23, 8, 6, "red");
  drawRect4(32, 21, 3, 2, "yellow");
  drawRect4(8, 19, 5, 3, "yellow");


  //third layer
  drawRect4(12, 35, 7, 8, "blue");
  drawRect4(5, 31, 15, 3, "red");
  drawRect4(6, 30, 3, 1, "yellow");
  drawRect4(9, 33, 3, 5, "blue");
  drawRect4(26, 32, 12, 5, "red");
  drawRect4(27, 32, 1, 15, "blue");
  drawRect4(27, 32.5, 15, 0.5, "yellow", false);
  drawRect4(35, 36, 4, 8, "blue");
  drawRect4(36, 35, 2, 2, "yellow");
  drawRect4(3, 36, 18, 1, "yellow", false);
  drawRect4(10, 42, 6, 6, "blue");
  drawRect4(13, 39, 8, 3, "white");
  drawRect4(22, 62, 3, 35, "red"); 
  drawRect4(23, 61, 1, 3, "yellow");

  //forth layer
  drawRect4(9, 48, 12, 6, "blue");
  drawRect4(18, 60, 1, 18, "white");
  drawRect4(19, 64, 1, 14, "blue");
  drawRect4(20, 62, 1, 14, "red");
  drawRect4(2, 49, 16, 1, "yellow", false);
  drawRect4(10, 62, 5, 13, "white");
  drawRect4(13, 54, 5, 5, "red");
  drawRect4(26, 50, 7, 8, "white");
  drawRect4(32, 48, 2, 5, "yellow");
  drawRect4(24, 47, 5, 4, "blue");
  drawRect4(25, 46, 3, 1, "yellow");
  drawRect4(22, 51, 14, 1, "yellow", false);
  drawRect4(22, 53, 3, 3, "yellow");
  drawRect4(26, 55, 1, 4, "blue");
  drawRect4(27, 58, 1, 7, "yellow", false);
  drawRect4(28, 57, 1, 6, "white");
  drawRect4(29, 54, 5, 3, "blue");
  drawRect4(31, 53, 2, 1, "yellow");


  //shadow
  drawRect4(2, 16, 12, 0.5, "black", false);
  drawRect4(2, 16, 12, 0.5, "black", false);
  drawRect4(10, 6, 0.5, 5, "black", false);
  drawRect4(12, 25, 0.5, 6, "black", false);
  drawRect4(28, 23, 0.5, 6, "black");
  drawRect4(14, 35, 0.5, 18, "black", false);
  drawRect4(27, 32, 0.5, 15, "black", false);
  drawRect4(27, 14, 0.5, 12, "black", false);
  drawRect4(14, 27, 4, 0.5, "black", false);
  drawRect4(27, 32, 8, 0.5, "black", false);
  drawRect4(10, 42, 6, 0.5, "black", false);
  drawRect4(22, 42, 0.5, 15, "black", false);
  drawRect4(22, 42, 3, 0.5, "black", false);
  drawRect4(9, 48, 9, 0.5, "black", false);
  drawRect4(9, 48, 9, 0.5, "black", false);

  //yellow floor
  drawRect4(0, 3, 40, 2, "yellow", false);
  drawRect4(0, 17, 35, 1, "yellow", false);
  drawRect4(0, 28, 40, 1, "yellow", false);
  drawRect4(12, 35, 2, 18, "yellow", false);
  drawRect4(25, 36, 2, 34, "yellow", false);
  drawRect4(7, 43, 31, 1, "yellow", false);
  drawRect4(21, 68, 1, 40, "yellow", false);




}

class ChangeRect { // class that defines movement behaviour for each individual rectangle of each building
  constructor(x, y, w, h, c, move) {
    this.x = x;
    this.y = y;
    this.currentX = this.x;
    this.currentY = this.y;
    this.width = w;
    this.height = h;
    this.currentH = this.height;
    this.colour = c;
    this.amplitude = 0;
    this.noiseStep = 0.01;
    this.currentNoiseX = random(5);
    this.currentNoiseHeight = random(5);
    this.move = move ?? true;
  }

  draw() {
    push();
    fillColour(this.colour);
    rect(this.currentX * rectWidth, height - this.currentY * rectHeight, this.width * rectWidth, this.currentH * rectHeight);
    pop();
  }

  update() {
    if (this.move == true) { // only move if boolean is set to allow rect to move
      this.currentX = this.x + noise(this.currentNoiseX) * this.amplitude - this.amplitude/2;
      this.currentH = this.height + noise(this.currentNoiseHeight) * this.amplitude - this.amplitude/2;
      this.currentY = this.y + noise(this.currentNoiseHeight) * this.amplitude - this.amplitude/2;
      this.currentNoiseX += this.noiseStep;
      this.currentNoiseHeight += this.noiseStep;
    }

    if (daytime == true) { // only start moving once it is night time
      this.amplitude = lerp(this.amplitude, 0, 0.02);
    } else {
      this.amplitude = lerp(this.amplitude, rectWidth, 0.02);
    }
  }
}

class LightPulse { // class that defines behaviour of lights in the background at night time
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.noiseStep = 0.1;
    this.currentSize = 0;
    this.currentNoise = 0;
    this.amplitude = random(minSide/6, minSide/2);
    this.colour = Math.round(random(1,2));
    this.filled = "red";
    this.targetSize = 0;
  }

  draw() {
    push();
    fillColour(this.filled, 50);
    rect(this.x, this.y, this.currentSize, this.currentSize);
    pop();
  }

  update() {
    this.currentSize = lerp(this.currentSize, this.targetSize, 0.2);

    if (this.colour % 3 == 0) {
      this.filled = "red";
    } else if (this.colour % 3 == 1) {
      this.filled = "blue";
    } else {
      this.filled = "yellow";
    }

    if (frameCount % 60 == 0) { // every second change to a random colour
      this.colour += Math.round(random(1,2));
    }

    this.currentNoise += this.noiseStep;
    this.targetSize = map(noise(this.currentNoise), 0, 1, 0, this.amplitude);
  }
}


function windowResized() { // update all relevant variables upon window resize
  resizeCanvas(windowWidth, windowHeight);
  minDimension();
  secondSegStart = width / 4;  
  secondSegWidth = width / 2 - secondSegStart;  
  thirdSegStart = width / 2;  
  thirdSegWidth = width / 4 * 3 - thirdSegStart;
  fourthSegStart = width / 4 * 3;
  fourthSegWidth = width - fourthSegStart;
  minHeight = windowHeight/4;
  maxHeight = windowHeight - minHeight;
  rectWidth = thirdSegWidth/40;
  rectHeight = maxHeight/80;
  daytime = true; // change back to daytime to allow lights to refresh
  lights = []; // clear lights so a new combination is generated upon next nighttime
  for (let i = 0; i < numLights; i++) {
    lights.push(new LightPulse)
  }
}

function mouseClicked() { // change between day/night upon mouse click
  if (daytime == false) {
    lights = []; // refresh lights with new combination each time night turns into day so a new look is achieved upon next night time
    for (let i = 0; i < numLights; i++) {
      lights.push(new LightPulse)
    }
  }
  daytime = !daytime;
  lightStart = frameCount; // set time to start calculating delay before lights start
}