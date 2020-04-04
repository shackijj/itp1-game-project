let enemyX;
let enemyY;

let spell;

function setup()
{
    createCanvas(1000,1000);
    background(0);

    enemyX = 700;
    enemyY = 300;

    spellContainer = new SpellContainer();
    spellContainer.addSpell(new FireSpell(100, 300, 1));
}

function draw()
{
    background(0);
    fill(255,0,0);

    //Enemy
    rect(enemyX,enemyY,100,200);
    if(spellContainer.castSpell)
    {
        spellContainer.currentSpell.updateSpell();
    }

}

function keyPressed()
{
    spellContainer.keyPressed();
}