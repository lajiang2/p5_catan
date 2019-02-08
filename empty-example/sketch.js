var resourceRows = [];
var numResources = 5;
var minDiceVal = 2;
var maxDiceVal = 12;
var resourceNames = ["Wood", "Brick", "Wheat", "Ore", "Sheep"];
var expectedTurns = [0, 0, 0, 0, 0];

function setup() {
  textAlign(CENTER);
  createCanvas(screen.width, screen.height);
  background("#CC3333");

  var diceValYPos = 150;
  for (var i = 0; i < numResources; i++) {
    var rollVals = [];
    var diceValXPos = 150;
    for (var val = minDiceVal; val <= maxDiceVal; val++) {
      if (val == 7) {
        continue;
      }
      rollVals.push(new diceVal(diceValXPos, diceValYPos, val));
      diceValXPos += 65;
    }
    resourceRows.push(rollVals)
    diceValYPos += 125;
  }
}

function draw() {
  background("#CC3333");

  fill(239, 230, 59);
  textSize(48);
  textAlign(CENTER);
  text("Settlers of Catan", windowWidth / 2, 60);

  textSize(24);
  text("Resource Information", windowWidth / 2, 100);

  textSize(16);
  text("Expected Resource per Turn", 1000, 120);

  var resourceNameXPos = 70;
  var resourceNameYPos = 180;
  for (var i = 0; i < resourceNames.length; i++) {
    textSize(16);
    text(resourceNames[i], resourceNameXPos, resourceNameYPos)
    resourceNameYPos += 125;
  }

  displayResources();
  displayTurnsPerResource();
}

function displayResources() {
  for (var i = 0; i < resourceRows.length; i++) {
    for (var j = 0; j < resourceRows[0].length; j++) {
      resourceRows[i][j].display();
    }
  }
}

function displayTurnsPerResource() {
  var resourceNameXPos = 1000;
  var resourceNameYPos = 180;
  for (var i = 0; i < resourceRows.length; i++) {
    textSize(16);
    var expectedTurns = 0;
    for (var j = 0; j < resourceRows[0].length; j++) {
      var roll = resourceRows[i][j].val;
      var numPoints = resourceRows[i][j].numPoints;
      if (roll == 2 || roll == 12) {
        expectedTurns += numPoints * (1 / 36);
      } else if (roll == 3 || roll == 11) {
        expectedTurns += numPoints * (2 / 36);
      } else if (roll == 4 || roll == 10) {
        expectedTurns += numPoints * (3 / 36);
      } else if (roll == 5 || roll == 9) {
        expectedTurns += numPoints * (4 / 36);
      } else if (roll == 6 || roll == 8) {
        expectedTurns += numPoints * (5 / 36);
      }
    }

    expectedTurns = expectedTurns.toFixed(2);

    text(expectedTurns, resourceNameXPos, resourceNameYPos);
    resourceNameYPos += 125;
  }
}

function mousePressed() {
  for(var i = 0; i < resourceRows.length; i++) {
    for(var j = 0; j < resourceRows[0].length; j++) {
      resourceRows[i][j].clicked();
    }
  }
}

function diceVal(xPos, yPos, val) {
  this.x = xPos;
  this.y = yPos;
  this.val = val;
  this.numPoints = 0;

  this.display = function() {
    stroke(255);
    fill(255, (1 / Math.abs(this.val - 7)) * 175);
    // Display box
    rect(this.x, this.y, 50, 50);

    // Display dice value
    textSize(16);
    text(this.val, this.x + 25, this.y - 10);
    // Display num points
    textSize(16 + this.numPoints * 2);
    text(this.numPoints, this.x + 25, this.y + 30 + this.numPoints);

    // Display + - boxes
    textSize(16);
    square(this.x, this.y + 50, 16);
    text("-", this.x + 8, this.y + 63);
    square(this.x + 34, this.y + 50, 16);
    text("+", this.x + 43, this.y + 63);
  }

  this.clicked = function() {
    if (this.x <= mouseX && mouseX <= this.x + 16 && this.y + 50 <= mouseY && mouseY <= this.y + 66) {
      if (this.numPoints > 0) {
        this.numPoints -= 1;
      }
    } else if (this.x + 34 <= mouseX && mouseX <= this.x + 50 && this.y + 50 <= mouseY && mouseY <= this.y + 66) {
      this.numPoints += 1;
    }
  }
}