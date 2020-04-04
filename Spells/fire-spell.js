class FireSpell
{

    constructor(x,y, direction)
    {
        this.sprites = [];
        this._load();

        this.x = x;
        this.y = y;
        this.radius = 30;
        this.direction = direction;

        this.animationStep = 0;
        this.frameCount = 0;

        this.lifeTime = 0;
    }

    updatePosition(x, y)
    {
        this.x = x;
        this.y = y;
    }


    updateSpell()
    {

        if (frameCount % 6 === 0) {
            this.animationStep++;
        }

        if (this.animationStep > 4) {
            this.animationStep = 0;
        }

        image(this.sprites[this.animationStep], this.x, this.y,this.radius * 2,this.radius * 2);


        if(this.direction == 1)
        {
            this.x += 8;
        }
        else{
            this.x -= 8;
        }

        this.lifeTime++;
    }

    _load() {
        this.sprites.push(loadImage("/spells/fire-imgs/fire-1.png"));
        this.sprites.push(loadImage("/spells/fire-imgs/fire-2.png"));
        this.sprites.push(loadImage("/spells/fire-imgs/fire-3.png"));
        this.sprites.push(loadImage("/spells/fire-imgs/fire-4.png"));
        this.sprites.push(loadImage("/spells/fire-imgs/fire-5.png"));

    }
    
}