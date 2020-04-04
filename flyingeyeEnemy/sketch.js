var gameChar_x = 0;
var gameChar_y = 0;
var adv;

function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    adv1 = new Adventurer();
    adv2 = new Adventurer();
    adv3 = new Adventurer();
    adv4 = new Adventurer();
    adv5 = new Adventurer();
    adv6 = new Adventurer();
    adv7 = new Adventurer();
    adv8 = new Adventurer();
}

function draw () {
    background(255);
    // Standing, facing frontwards

    stroke(100);
    noFill();
    rect(20, 60, 200, 148);
    noStroke();
    fill(0);
    text('1. standing facing right', 20, 228);

    gameChar_x = 120;
    gameChar_y = 208;
    adv1.setState(Adventurer.States.FacingRight);
    adv1.draw(gameChar_x, gameChar_y);

    // Jumping facing forwards
    stroke(100);
    noFill();
    rect(240, 60, 200, 148);
    noStroke();
    fill(0);
    text('2. standing facing left', 240, 228);

    gameChar_x = 340;
    gameChar_y = 208;
    adv2.setState(Adventurer.States.FacingLeft);
    adv2.draw(gameChar_x, gameChar_y);

    // Walking, turned left
    stroke(100);
    noFill();
    rect(20, 260, 200, 148);
    noStroke();
    fill(0);
    text('3. Walking right', 20, 428);

    gameChar_x = 120;
    gameChar_y = 408;
    // Add your code here ...
    adv3.setState(Adventurer.States.WalkingRight);
    adv3.draw(gameChar_x, gameChar_y);

    // Walking, turned right
    stroke(100);
    noFill();
    rect(240, 260, 200, 148);
    noStroke();
    fill(0);
    text('4. Walking left', 240, 428);

    gameChar_x = 340;
    gameChar_y = 408;
    adv4.setState(Adventurer.States.WalkingLeft);
    adv4.draw(gameChar_x, gameChar_y);

    // Jumping right
    stroke(100);
    noFill();
    rect(20, 460, 200, 148);
    noStroke();
    fill(0);
    text('5. Plummeting to the right', 20, 628);

    gameChar_x = 120;
    gameChar_y = 608;

    adv5.setState(Adventurer.States.PlummetingRight);
    adv5.draw(gameChar_x, gameChar_y);

    // Jumping to the left
    stroke(100);
    noFill();
    rect(240, 460, 200, 148);
    noStroke();
    fill(0);
    text('6. Plummeting to the left', 240, 628);

    gameChar_x = 340;
    gameChar_y = 608;
    adv6.setState(Adventurer.States.PlummetingLeft);
    adv6.draw(gameChar_x, gameChar_y);

    // Jumping right
    stroke(100);
    noFill();
    rect(20, 660, 200, 148);
    noStroke();
    fill(0);
    text('7. Falling to the right', 20, 828);

    gameChar_x = 120;
    gameChar_y = 808;

    adv7.setState(Adventurer.States.FallingRight);
    adv7.draw(gameChar_x, gameChar_y);

    // Jumping to the left
    stroke(100);
    noFill();
    rect(240, 660, 200, 148);
    noStroke();
    fill(0);
    text('8. Falling to the left', 240, 828);

    gameChar_x = 340;
    gameChar_y = 808;

    adv8.setState(Adventurer.States.FallingLeft);
    adv8.draw(gameChar_x, gameChar_y);
}
