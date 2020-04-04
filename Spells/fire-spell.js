class FireSpell
{
    constructor(x,y, direction)
    {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.direction = direction;

        this.lifeTime = 0;
    }

    updatePosition(x, y)
    {
        this.x = x;
        this.y = y;
    }

    updateSpell()
    {
        image(sprite, this.x, this.y);


        if(this.direction == 1)
        {
            this.x += 8;
        }
        else{
            this.x -= 8;
        }

        this.lifeTime++;
    }

    
}