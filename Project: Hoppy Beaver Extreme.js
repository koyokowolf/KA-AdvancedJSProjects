/*Make game more interesting!
Here are some ideas on what you can do:
  - Invert the collision mechanism: make it so that the beaver has to get through a hole, without touching the sides.
  - Add obstacles that decrement the score: like bad sticks or holes in the ground.
  - Add NPCs: characters that attack the beaver, and have programmatically controlled movement of their own.
  - Add multiple levels, with increasing levels of difficulty (like new types of obstacles).
  - Add a cooler win state.*/

var Beaver = function(x, y) {
    this.x = x;
    this.y = 300;// changed y to 300 so hopper is standing on top of the ground
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
    this.badSticks = 0; // added bad sticks
    this.goodSticks = 0; // added good sticks
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-80);//changed height-50 to height-80 so that hopper never falls below the ground
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
        this.goodSticks++; //added good sticks counter
    }
};
//Created a way to check for bad sticks
Beaver.prototype.checkForBadStickGrab = function (badStick) {
    if ((badStick.x >= this.x && badStick.x <= (this.x + 40)) &&
        (badStick.y >= this.y && badStick.y <= (this.y + 40))){
            badStick.y = -400;
            this.sticks --;
            this.badSticks++;
    }
};
var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 40; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}
// Finished creating Bad Sticks
var BadStick = function (x,y) {
  this.x = x;
  this.y = y;
};
BadStick.prototype.draw = function(){
    noStroke();
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};
var badSticks = []; 
for ( var i = 0; i < 20; i++) {
    badSticks.push(new BadStick(i * 100 + 300, random(20, 200)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
  // draw grass
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
   // draw sticks 
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    // add draw Bad Sticks
    for (var i = 0; i < badSticks.length; i++){
        badSticks[i].draw();
        beaver.checkForBadStickGrab(badSticks[i]);
        badSticks[i].x -= 1;
    }
    //Scores add Good Sticks Score and Bad Sticks Score
    fill(0, 0, 0);  
    textSize(18);
    text("Score: " + beaver.sticks, 20, 30);
    
    // Good Sticks Score
    fill(0, 0, 0);
    textSize(10);
    text("Good Sticks " + beaver.goodSticks, 20, 42);
  
    // Bad Sticks Score
    textSize(10);
    fill(255, 0, 0);
    text("Bad Sticks " + beaver.badSticks, 20, 52);
  
    // Results
    if (beaver.sticks/sticks.length >= 0.99 || beaver.goodSticks > beaver.badSticks) {
        fill(191, 23, 23);
        textSize(36);
        text("YOU WIN!!!!", 100, 200);
    }
    else if (beaver.badSticks > beaver.goodSticks){
        fill(255, 0, 0);
        textSize(36);
        text("GAME OVER!!!!", 100, 200);
    }
    //Control Statement for Beaver
    if (keyIsPressed && keyCode === UP) {// changed keyCode to UP for UP arrow
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};
