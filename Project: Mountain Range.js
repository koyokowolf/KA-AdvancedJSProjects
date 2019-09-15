var drawRange = function(blue, color, num1, num2) {
    stroke(red, color, color);
    var incAmount = 0.01;
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t+num2*250);
        var y = map(n, 0, 1, 0, height/2);
        rect(t*100, height-y-num1, 1, y+50);
    }
};

background(255, 171, 15);

var mountainLarge = function(num) {
    while (true) {
        var r1 = random(num);
        var probability = r1;
        var r2 = random(num);
        if (r2 > probability) {
            return r2;
        }
    }
};

var MountainSmall = function(num) {
    while (true) {
        var r1 = random(num);
        var probability = r1;
        var r2 = random(num);
        if (r2 > probability) {
            return r1;
        }
    }
};

//Used a for loop to draw mountain ranges.
for (var i = 0; i < 9; i++) {
    //shadow
    drawRange(15+5*i, 10*i-10, 252-40*i, i);
    //mountain
    drawRange(40+42*i, 29+32*i, 245-40*i, i);
}
