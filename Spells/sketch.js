let enemyX;
let enemyY;

let spell;
var sprite;
var spellContainer;

function preload()
{
    sprite = loadImage("/spells/fireball.png");
}

function setup()
{
    createCanvas(1000,1000);
    background(0);

    enemyX = 700;
    enemyY = 300;

    spellContainer = new SpellContainer();
    spellContainer.addSpell({spellType: "fire", array: []});
    spellContainer.addSpell({spellType: "ice", array: []});
    spellContainer.addSpell({spellType: "air", array: []});
}

function draw()
{
    background(0);
    fill(255,0,0);

    //Enemy
    rect(enemyX,enemyY,100,200);

    if(spellContainer.castFire)
    {
        for(let i = 0; i < spellContainer.spells[0].array.length; i++)
        {
           
            if(spellContainer.spells[0].array[i].lifeTime >= 100)
            {
                spellContainer.spells[0].array.splice(0,1);
                console.log("Called");
                
            }
            else{
                spellContainer.spells[0].array[i].updateSpell();     
            }
             
        }
    }

    if(spellContainer.cas)
    {
        for(let i = 0; i < spellContainer.spells[0].array.length; i++)
        {
           
            if(spellContainer.spells[0].array[i].lifeTime >= 100)
            {
                spellContainer.spells[0].array.splice(0,1);
                console.log("Called");
                
            }
            else{
                spellContainer.spells[0].array[i].updateSpell();     
            }
             
        }
    
    }

    

}

function keyPressed()
{
    spellContainer.keyPressed();
}