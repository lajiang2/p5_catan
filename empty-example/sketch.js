var diceVals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var rectangles = [];
var x_pos = 30;
var y_pos = 200;
var width = 60; 
var height = 60;


function setup() {
  textAlign(CENTER);
  createCanvas(screen.width, screen.height);
  background("#CC3333");

  fill(239, 230, 59);
  textSize(48);
  textAlign(CENTER);
  text("Settlers of Catan", windowWidth / 2, 60);

  textSize(24);
  text("Resource Information", windowWidth / 2, 100);

  for (var i = 0; i < diceVals.length; i++) {
    var diceVal = diceVals[i];

    rectangles[i] = new Rectangle(x_pos, y_pos, width, height, diceVal, i);

    x_pos = x_pos + width + 5;
  }

  displayArray();


  // text("Wood", windowWidth / 10, 150);

  // text("Brick", (windowWidth / 10) * 3, 150);

  // text("Wheat", (windowWidth / 10) * 5, 150);

  // text("Ore", (windowWidth / 10) * 7, 150);

  // text("Sheep", (windowWidth / 10) * 9, 150);

}

function displayArray() {
  // displayBackgroundBox(145, rectangles[0].y + 100);
  for(var i = 0; i < rectangles.length; i++) {
    rectangles[i].display();
  }
}

function draw() {


}