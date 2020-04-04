class SpellContainer
{
    constructor()
    {
        this.spells = [];
        this.currentSpell = null;

        this.castFire = false;
        this.castIce = false;
        this.castAir = false;

        this.playerX = 100;
        this.playerY = 300;
        this.direction = 1;
    }

    addSpell(spell)
    {
        this.spells.push(spell);

        if(this.currentSpell == null)
        {
            this.currentSpell = this.spells[0];
        }
    }

    changeSpell(spell)
    {
        this.currentSpell = spell;
    }

    keyPressed()
    {
        switch(keyCode)
        {
            case 49:
                this.changeSpell(this.spells[0]);
                break;
            case 32:
                this.currentSpell.array.push(new FireSpell(
                    this.playerX, 
                    this.playerY, 
                    this.direction));
                this.castFire = true;
            default:
                break;
        }
    }

    hitCheck(enemyX, enemyY)
    {
        
    }

}