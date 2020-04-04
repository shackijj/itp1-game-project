class SpellContainer
{
    constructor()
    {
        this.spells = [];
        this.currentSpell = null;

        this.castSpell = false;
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
                this.currentSpell.updateSpell();
                this.castSpell = true;
            default:
                break;
        }
    }

}