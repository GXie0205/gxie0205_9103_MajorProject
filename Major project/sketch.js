// Global variables
let thirdSegStart;
let thirdSegWidth;
let minHeight;
let maxHeight;
let rectWidth;
let rectHeight;
let red = [206, 29, 29];
let blue = [21, 33, 173];
let yellow = [255, 196, 31];
let numNoisePixels = 50;
let noisePixels = [];
let rects = [];

function fillColour(colour) { // Fills colour based on inputted colour name
  switch(colour) {
    case "red":
      fill(red[0], red[1], red[2]);
      break;
    case "blue":
      fill(blue[0], blue[1], blue[2]);
      break;
    case "yellow":
      fill(yellow[0], yellow[1], yellow[2]);
      break;
    case "white":
      fill(255);
      break;
    case "black":
      fill(0);
      break;
  }
}

function drawRect1(x, y, w, h, c) { // draws rectangle using ratios as setup in global variables
  fillColour(c);
  rect(x*rectWidth, windowHeight - y*rectHeight, w*rectWidth, h*rectHeight);
}

function drawRect(x, y, w, h, c, m) { // draws rectangle using ratios as setup in global variables
  rects.push(new ChangeRect(x, y, w, h, c, m));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  thirdSegStart = width/2;
  thirdSegWidth = width/4*3 - thirdSegStart;
  minHeight = height/4;
  maxHeight = height - minHeight;
  rectWidth = thirdSegWidth/40;
  rectHeight = maxHeight/80;

  // // Setup noise
  // for (let i = 0; i < numNoisePixels; i++) {
  //   noisePixels.push(new NoisePixel());
  // }

  // Bottom layer
  drawRect(6, 20, 3, 20, "white");
  drawRect(4, 20, 2, 20, "yellow", false);
  drawRect(2, 8, 5, 5, "blue");
  drawRect(8, 20, 12, 20, "blue");
  drawRect(9, 16, 4, 11, "red");
  drawRect(20, 20, 1, 8, "yellow", false);
  drawRect(21, 20, 9, 8, "red");
  drawRect(20, 12, 18, 12, "white");
  drawRect(26, 17, 10, 8, "blue");
  drawRect(1, 22, 33, 2, "black", false);
  drawRect(19, 20, 1, 20, "black", false);

  // Middle layer
  drawRect(8, 54, 8, 7, "red");
  drawRect(17, 54, 14, 21, "blue");
  drawRect(31, 46, 5, 13, "red");
  drawRect(23, 53, 6, 6, "red");
  drawRect(25, 51, 2, 2, "white");
  drawRect(5, 43, 17, 19, "white");
  drawRect(26, 33, 7, 8, "white");
  drawRect(2, 39, 8, 14, "red");
  drawRect(12, 42, 3, 14, "blue");
  drawRect(7, 42, 1, 17, "yellow");
  drawRect(10, 42, 1, 17, "yellow");
  drawRect(22, 33, 4, 9, "yellow");
  drawRect(1, 25, 33, 3, "yellow");
  drawRect(16, 54, 1, 7, "black");
  drawRect(7, 55, 32, 1, "black");
  drawRect(4, 43, 13, 1, "black");
  drawRect(4, 47, 13, 4, "yellow");

  // Top layer
  drawRect(3, 66, 22, 9, "blue");
  drawRect(27, 67, 9, 10, "white");
  drawRect(1, 75, 19, 13, "white");
  drawRect(10, 71, 5, 9, "blue");
  drawRect(3, 79, 5, 8, "red");
  drawRect(8, 77, 10, 3, "red");
  drawRect(23, 80, 9, 9, "red");
  drawRect(22, 68, 16, 1, "black");
  drawRect(7, 57, 32, 2, "yellow");
  drawRect(22, 71, 16, 3, "yellow");
  drawRect(25, 68, 2, 11, "yellow");

  // Yellow floor
  drawRect(0, 3, 40, 3, "yellow");
}

function draw() {
  background(0);
  push();

  translate(thirdSegStart, 0); // sets start of canvas to third quarter of the screen

  for (let i = 0; i < rects.length; i++) {
    rects[i].update();
    rects[i].draw();
  }

  // Noise Pixels
  for (let i = 0; i < noisePixels.length; i++) {
    noisePixels[i].update();
    noisePixels[i].drawNoise();
  }

  pop();
}

class ChangeRect {
  constructor(x, y, w, h, c, move) {
    this.x = x;
    this.y = y;
    this.currentX = this.x;
    this.currentY = this.y;
    this.width = w;
    this.height = h;
    this.currentH = this.height;
    this.colour = c;
    this.amplitude = 1 * rectWidth;
    this.noiseStep = 0.01;
    this.currentNoiseX = random(5);
    this.currentNoiseHeight = random(5);
    this.move = true ?? move;
  }

  draw() {
    push();
    fillColour(this.colour);
    rect(this.currentX * rectWidth, height - this.currentY * rectHeight, this.width * rectWidth, this.currentH * rectHeight);
    pop();
  }

  update() {
    if (this.move == true) {
      this.currentX = this.x + noise(this.currentNoiseX) * this.amplitude;
      this.currentH = this.height + noise(this.currentNoiseHeight) * this.amplitude;
      this.currentY = this.y + noise(this.currentNoiseHeight) * this.amplitude;
      this.currentNoiseX += this.noiseStep;
      this.currentNoiseHeight += this.noiseStep;
    }
  }
}

class NoisePixel {
  constructor() {
    this.x = random(thirdSegWidth);
    this.y = random(minHeight, height);
    this.currentX = this.x;
    this.currentY = this.y;
    this.width = random(1, 4) * rectWidth;
    this.height = random(1, 4) * rectHeight;
    this.baseColour = get(this.x + this.width/2, this.y + this.height/2);
    this.amplitude = 50;
    this.colour = [random(this.amplitude) + this.baseColour[0], random(this.amplitude) * this.amplitude + this.baseColour[1], random(this.amplitude) * this.amplitude + this.baseColour[2]];
    this.noiseStep = 0.01;
    this.currentNoiseX = random(5);
    this.currentNoiseY = random(5);
  }

  drawNoise() {
    push();
    fill(this.colour[0], this.colour[1], this.colour[2]);
    // console.log(this.currentX, this.currentY, this.width, this.height);
    rect(this.currentX, this.currentY, this.width, this.height);
    pop();
  }

  update() {
    this.currentX = noise(this.currentNoiseX) * this.amplitude + this.x;
    this.currentY = noise(this.currentNoiseY) * this.amplitude + this.y;
    this.baseColour = get(this.x + this.width/2, this.y + this.height/2);
    this.colour = [noise(1) * this.amplitude + this.baseColour[0], noise(1) * this.amplitude + this.baseColour[1], noise(1) * this.amplitude + this.baseColour[2]];
    this.currentNoiseX += this.noiseStep;
    this.currentNoiseY += this.noiseStep;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  thirdSegStart = windowWidth/2;
  thirdSegWidth = windowWidth/4*3 - thirdSegStart;
  minHeight = windowHeight/4;
  maxHeight = windowHeight - minHeight;
  rectWidth = thirdSegWidth/40;
  rectHeight = maxHeight/80;
}

