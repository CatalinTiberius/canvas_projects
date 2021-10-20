class Circle {
    constructor(canvas,x,y,radius,dx,dy,color){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.mdx = 0;
        this.mdy = 0;
        this.idx = dx;
        this.idy = dy;
        this.color = color;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;
        this.iradius = radius;
        this.moved = undefined;
    }

    update(deltaTime){

        //Move away from mouse

    if(!paused)
    {
        var a = this.x - mouse.x;
        var b = this.y - mouse.y;
        var distance = Math.sqrt(a*a + b*b);
        if(distance<80){
            if(!this.mdx && !this.mdy)
                {
                    this.moved = true;
                    setTimeout(()=>{
                        this.mdx = this.dx;
                        this.mdy = this.dy;
                    }, 500)
                }
            this.accX = a/5;
            this.accY = b/5;
            this.dx += this.accX;
            this.dy += this.accY;
            //console.log(`Aproape dx:${this.dx} dy:${this.dy}`);
        }
        else{
            if(!(typeof this.moved === 'undefined'))
            {
                this.moved = false;
                if(Math.abs(this.dx)>Math.abs(this.idx))
                    this.dx *= this.friction;
                if(Math.abs(this.dy)>Math.abs(this.idy))
                    this.dy *= this.friction;
            }
            //console.log(`Departe dx:${this.dx} dy:${this.dy}`);
        }
        


        //Bounce off of edges
        if(this.x + this.radius > this.canvas.width || this.x - this.radius < 0)
            this.dx = -this.dx;

        if(this.y + this.radius > this.canvas.height || this.y - this.radius < 0)
            this.dy = -this.dy;
        
        this.x += this.dx * deltaTime;
        this.y += this.dy * deltaTime;
        }
        this.draw();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}