class FireSpell
{
    constructor(x,y, direction)
    {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.direction = direction;

        this.castSpell = false;
    }

    keyPressed()
    {
        switch(keyCode)
        {
            case 49:
                this.castSpell = true;
                break;
            default:
                break;
        }
    }

    updateSpell()
    {
        fill(255,0,0);
        ellipse(this.x, this.y, this.radius);

        if(this.direction == 1)
        {
            this.x += 5;
        }
        else{
            this.x -= 5;
        }
    }
}