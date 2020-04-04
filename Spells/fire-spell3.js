class FireSpell2
{
    constructor(x,y, direction)
    {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.direction = direction;

        this.lifeTime = 0;
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