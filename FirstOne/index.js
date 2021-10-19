//  Variables

var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var ctx = canvas.getContext('2d');
var circleArray = [];
var colorPresets = {
    'preset1': ['#F5F5F5','#0C0A3E','#7B1E7A','#B33F62','#F9564F','#F3C677',],
    'preset2': ['#F5F5F5', '#A8C0CE', '#AAB0B5', '#768591', '#DEA800', '#EEEC00'],
    'preset3': ['#F5F5F5', '#F20587', '#2E038C', '#F2B705', '#F28705', '#BF3604'],
    'preset4': ['#F5F5F5', '#241F8F', '#213C99', '#235182', '#2A96BD', '#03FFFF'],
    'preset5': ['#0D0D0D', '#D9A404', '#D98E04', '#F25C05', '#D93232', '#FF50D9'],
    'preset6': ['#0D0D0D','#100126', '#F213A4', '#48038C', '#0F0140', '#5204BF'],
    'preset7': ['#0D0D0D', '#072602', '#0C40040', '#3AA629', '#4AD923'],
    'preset8': ['#0D0D0D', '#BF110C', '#7F0B08', '#FF1610', '#400604', '#E5140E'],
}

var colorArray = colorPresets['preset' + (Math.floor(Math.random()*Object.keys(colorPresets).length) + 1)];

var mouse = {
    x: undefined,
    y: undefined,
};

var paused = false;

//  create Menu

var menuScreen = document.getElementById('menu-screen');

var menuMain = document.createElement('div');
menuMain.classList.add("menu");
menuScreen.appendChild(menuMain);


//  Add title to main menu

let mainTitle = document.createElement('div');
let text0 = document.createTextNode("Main Menu");
mainTitle.appendChild(text0);
mainTitle.classList.add("menu-title");
menuMain.appendChild(mainTitle);

//  Add colors option to main menu

let mainItem = document.createElement('div');
let text = document.createTextNode("Color Presets");
mainItem.appendChild(text);
mainItem.addEventListener('click', () => {
    menuColors.style.visibility = "visible";
    menuMain.style.visibility = "hidden";
})
mainItem.classList.add("menu-item");
menuMain.appendChild(mainItem); 


//  Add color presets to colors menu

var menuColors = document.createElement('div');
menuColors.classList.add("menu");
menuScreen.appendChild(menuColors);
menuColors.style.visibility = "hidden";


let colorsTitle = document.createElement('div');
let text1 = document.createTextNode("Color Presets");
colorsTitle.appendChild(text1);
colorsTitle.classList.add("menu-title");
menuColors.appendChild(colorsTitle);


for(var preset in colorPresets)
{
    let colors = colorPresets[preset];
    let menuItem = document.createElement('div');
    let text = document.createTextNode(preset);
    menuItem.appendChild(text);
    menuItem.addEventListener('click', () => {
        circleArray = [];
        init(nrCircles, colors);
    })
    menuItem.classList.add("menu-item");

    for(let color in colors){
        let clDiv = document.createElement('div');
        clDiv.style.backgroundColor = colors[color];
        clDiv.style.width = "8px";
        clDiv.style.height = "1.15em";
        if(color === 0){
            clDiv.style.marginLeft = "15px";
        }
        menuItem.appendChild(clDiv);
    }

    menuColors.appendChild(menuItem);
}

//  Array with all the menus

var menusArray = [];
menusArray.push(menuMain);
menusArray.push(menuColors);


//  Functions

function init(nrCircles, colorArray) {

    canvas.style.background = colorArray[0];

    if(nrCircles != circleArray.length) {
        circleArray = [];
        for (let i = 0; i<nrCircles; i++) {
            let radius = Math.floor((Math.random()+0.3) * 15);
            let x = Math.random() * (innerWidth - radius * 2) + radius;
            let y = Math.random() * (innerHeight- radius * 2) + radius ;
            let dx = (Math.random() - 0.5) * 100;
            let dy = (Math.random() - 0.5) * 100;
            let color = colorArray[Math.floor(Math.random()*(colorArray.length-1)) + 1];
            let circle = new Circle(x,y,radius,dx,dy,color);
            circleArray.push(circle);
        }
    }
    

}

const deltaTime = 1/60;
let accumulatedTime = 0;
let lastTime = 0;

function animate(timestamp) {

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    accumulatedTime += ((timestamp - lastTime) / 1000);
    
    while(accumulatedTime > deltaTime){
        for(let i = 0; i < circleArray.length; i++)
            {
                circleArray[i].update(deltaTime);
            }
        
            accumulatedTime -= deltaTime;
    }
    
    //requestAnimationFrame(animate);
    setTimeout(animate, 1000/60, performance.now());

    lastTime = timestamp;
}


// Window Event Listeners

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    if (canvas.width > 1250)
        {   nrCircles = 650;
            init(nrCircles, colorArray);
        }   
    else if(canvas.width > 768 && canvas.width < 1250)
        {
            nrCircles = 350;
            init(nrCircles, colorArray);
        }
    else
        {
            nrCircles = 250;
            init(nrCircles, colorArray);
        }

    //console.log(`height:${canvas.height}  width:${canvas.width} circles:${nrCircles}`);
})

addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
    //console.log(mouse);
})

addEventListener('keypress', (ev) => {
    if(ev.key == 'm')
    {
        if(menuScreen.style.visibility == 'visible')
            {
                menusArray.forEach(element => {
                    element.style.visibility = "hidden";
                });
                menuScreen.style.visibility = 'hidden';
                paused = false;
            }
        else
            {
                menuMain.style.visibility = "visible";
                menuScreen.style.visibility = 'visible';
                paused = true;
            }

    }
})

//      Initialize

if (canvas.width > 1250)
{   nrCircles = 650;
    init(nrCircles, colorArray);
}   
else if(canvas.width > 768 && canvas.width < 1250)
{
    nrCircles = 350;
    init(nrCircles, colorArray);
}
else
{
    nrCircles = 250;
    init(nrCircles, colorArray);
}

animate(0);

