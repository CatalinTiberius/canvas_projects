class CircleProj{
    colorPresets = {
        'preset1': ['#F5F5F5','#0C0A3E','#7B1E7A','#B33F62','#F9564F','#F3C677',],
        'preset2': ['#F5F5F5', '#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00'],
        'preset3': ['#F5F5F5', '#F20587', '#2E038C', '#F2B705', '#F28705', '#BF3604'],
        'preset4': ['#F5F5F5', '#241F8F', '#213C99', '#235182', '#2A96BD', '#03FFFF'],
        'preset5': ['#0D0D0D', '#D9A404', '#D98E04', '#F25C05', '#D93232', '#FF50D9'],
        'preset6': ['#0D0D0D','#100126', '#F213A4', '#48038C', '#0F0140', '#5204BF'],
        'preset7': ['#0D0D0D', '#072602', '#0C40040', '#3AA629', '#4AD923'],
        'preset8': ['#0D0D0D', '#BF110C', '#7F0B08', '#FF1610', '#400604', '#E5140E'],
    };

    //  Random preset
    colorArray = this.colorPresets['preset' + (Math.floor(Math.random()*Object.keys(this.colorPresets).length) + 1)];
    nrCircles = 0;


    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.paused = false;
        this.circleArray = [];

    }

    init(nrCircles){
        this.canvas.style.background = this.colorArray[0];

        if(nrCircles != this.circleArray.length) {
            this.circleArray = [];
            this.nrCircles = nrCircles;
            for (let i = 0; i<this.nrCircles; i++) {
                let radius = Math.floor((Math.random()+0.3) * 15);
                let x = Math.random() * (this.width - radius * 2) + radius;
                let y = Math.random() * (this.height- radius * 2) + radius ;
                let dx = (Math.random() - 0.5) * 100;
                let dy = (Math.random() - 0.5) * 100;
                let color = this.colorArray[Math.floor(Math.random()*(this.colorArray.length-1)) + 1];
                let circle = new Circle(this.canvas,x,y,radius,dx,dy,color);
                this.circleArray.push(circle);
            }
        }

    }

    update(deltaTime){
        if(!this.paused){
            this.ctx.clearRect(0, 0, this.width, this.height);
            for(let i = 0; i < this.circleArray.length; i++)
                {
                    this.circleArray[i].update(deltaTime);
                }
        }
    }

    changeColors(colors){
        this.colorArray = colors;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.canvas.style.background = colors[0];
        for (let i = 0; i<this.nrCircles; i++) {
            this.circleArray[i].color = colors[Math.floor(Math.random()*(colors.length-1)) + 1];
            this.circleArray[i].draw();
        }
    }

    checkWindowSize(canvas){
        if(canvas.width > 1250)   { 
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.changeSize(canvas);
            return 650;
        }
        else if(canvas.width > 768 && canvas.width < 1250){
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.changeSize(canvas);
            return 350;
        }
        else{
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.changeSize(canvas);
            return 250;
        }

    }

    changeSize(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
    }
}