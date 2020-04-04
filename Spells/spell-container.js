class SpellContainer
{
    constructor()
    {
        this.spells = [];
        this.currentSpell = null;

        this.castFire = false;
        this.castIce = false;
        this.castAir = false;

        this.direction = 1;
    }

    changeSpell(spell)
    {
        this.currentSpell = spell;
    }

    keyPressed(playerX, playerY, isLeft)
    {
        switch(keyCode)
        {
            case 49:
                this.changeSpell(this.spells[0]);
                break;
            case 70:
                console.log('spell added')
                this.spells.push(
                    new FireSpell(
                        playerX, 
                        playerY, 
                        isLeft ? 0 : 1)
                );
                this.castFire = true;
            default:
                break;
        }
    }

    hitCheck(enemyX, enemyY)
    {
        
    }

}