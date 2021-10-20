//  Variables

var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;
var chosenProject = new CircleProj(canvas);

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


for(var preset in chosenProject.colorPresets)
{
    let colors = chosenProject.colorPresets[preset];
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


// Window Event Listeners

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    let culori = chosenProject.colorArray;
    chosenProject = new CircleProj(canvas);
    chosenProject.colorArray = culori;
    chosenProject.init();
    
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

chosenProject.init();

const timer = new Timer(1/60);
timer.update = function update(deltaTime) {
    chosenProject.update(deltaTime);
}

timer.start();

