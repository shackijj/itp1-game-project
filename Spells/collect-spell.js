class collectSpell
{
    constructor()
    {
        this.range = 150; //distance between the player and the collectable iteam for the spell to take effect
        this.castSpell = false;
    }

    keyPressed()
    {
        switch(keyCode)
        {
            case 51:
                this.castSpell = true;
                break;
            default:
                break;
        }
    }

    updateSpell()
    {
        for (var i=0; i < collectables.length; i++) {
            var itemDistance = dist(player.x,player.y,collectables[i].x,collectables[i].y);
            if (itemDistance < this.range && itemDistance > 3) { //Assums the collectable detection already implemented in the game will take care of the item and mark it as collected when it gets close to player position
                collectables[i].x = (collectables[i].x - player.x) / 15; //the item will animate towards player position with accelerated motion.
                collectables[i].y = (collectables[i].y - player.y) / 15;
            }
        }
    }
}