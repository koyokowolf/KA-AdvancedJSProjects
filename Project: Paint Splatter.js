// Declaring variables
var generator = new Random(1);
var deviation = 50;
var mean = 250;

// Draw function to draw the paint splatters
var draw = function() {
    
    // X and Y numbers generated using nextGaussian
    var numx = generator.nextGaussian();
    var numy = generator.nextGaussian();
    
    // X and Y coordinates are generated
    var x = deviation * numx + mean;
    var y = deviation * numy + mean;
    
    // Colour is assigned and ellipse is drawn
    noStroke();
    fill(random(255),random(255), random(255), random(255));
    ellipse(x, y, 31, 31);
};
