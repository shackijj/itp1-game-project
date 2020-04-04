var gameChar_x = 0;
var gameChar_y = 0;
var adv;

function setup () {
    createCanvas(1000, 1000);
}

function preload() {
    emenyFlying = new FlyingEyeEnemy();
    // adv1 = new FlyingEyeEnemy();
    // adv2 = new FlyingEyeEnemy();
    // adv3 = new FlyingEyeEnemy();
    // adv4 = new FlyingEyeEnemy();

}

function draw () {

    background(255);
    //Flying

    stroke(100);
    noFill();
    rect(20, 60, 200, 148);
    noStroke();
    fill(0);
    text('1. Flying', 20, 228);

    gameEmeny_x = 120;
    gameEmeny_y = 208;
    emenyFlying.setState(FlyingEyeEnemy.Flight);
    emenyFlying.draw(gameEmeny_x, gameEmeny_y);

    // //Attacking
    // stroke(100);
    // noFill();
    // rect(240, 60, 200, 148);
    // noStroke();
    // fill(0);
    // text('2. Attacking', 240, 228);

    // gameEmeny_x = 340;
    // gameEmeny_y = 208;
    // adv2.setState(Adventurer.States.Attack);
    // adv2.draw(gameEmeny_x, gameEmeny_y);

    // //Dying
    // stroke(100);
    // noFill();
    // rect(20, 260, 200, 148);
    // noStroke();
    // fill(0);
    // text('3. Dying', 20, 428);

    // gameEmeny_x = 120;
    // gameChar_y = 408;
    // // Add your code here ...
    // adv3.setState(Adventurer.States.Death);
    // adv3.draw(gameEmeny_x, gameEmeny_y);

    // //Hit
    // stroke(100);
    // noFill();
    // rect(240, 260, 200, 148);
    // noStroke();
    // fill(0);
    // text('4. Hit', 240, 428);

    // gameEmeny_x = 340;
    // gameChar_y = 408;
    // adv4.setState(Adventurer.States.TakeHit);
    // adv4.draw(gameEmeny_x, gameEmeny_y);




    // // Jumping right
    // stroke(100);
    // noFill();
    // rect(20, 460, 200, 148);
    // noStroke();
    // fill(0);
    // text('5. Plummeting to the right', 20, 628);

    // gameChar_x = 120;
    // gameChar_y = 608;

    // adv5.setState(Adventurer.States.PlummetingRight);
    // adv5.draw(gameChar_x, gameChar_y);

    // // Jumping to the left
    // stroke(100);
    // noFill();
    // rect(240, 460, 200, 148);
    // noStroke();
    // fill(0);
    // text('6. Plummeting to the left', 240, 628);

    // gameChar_x = 340;
    // gameChar_y = 608;
    // adv6.setState(Adventurer.States.PlummetingLeft);
    // adv6.draw(gameChar_x, gameChar_y);

    // // Jumping right
    // stroke(100);
    // noFill();
    // rect(20, 660, 200, 148);
    // noStroke();
    // fill(0);
    // text('7. Falling to the right', 20, 828);

    // gameChar_x = 120;
    // gameChar_y = 808;

    // adv7.setState(Adventurer.States.FallingRight);
    // adv7.draw(gameChar_x, gameChar_y);

    // // Jumping to the left
    // stroke(100);
    // noFill();
    // rect(240, 660, 200, 148);
    // noStroke();
    // fill(0);
    // text('8. Falling to the left', 240, 828);

    // gameChar_x = 340;
    // gameChar_y = 808;

    // adv8.setState(Adventurer.States.FallingLeft);
    // adv8.draw(gameChar_x, gameChar_y);
}
