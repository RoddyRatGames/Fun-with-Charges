const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let dotRadius = 8;
let maxColors = 3;
let colorIntensity = 1;
let frictionCoefficient = 1;


let dots = [];


onclick = (e) => {
    let color = 0;
    if(e.shiftKey && maxColors > 2){
        color = 2;
    } else if(e.ctrlKey && maxColors > 4){
        color = 4;
    }
    new Dot(
        e.clientX - canvas.getBoundingClientRect().left,
        e.clientY - canvas.getBoundingClientRect().top,
        color
    );
    console.log(dots)
}


oncontextmenu = (e) => {
    e.preventDefault();
    let color = 1;
    if(e.shiftKey && maxColors > 3){
        color = 3;
    } else if(e.ctrlKey && maxColors > 5){
        color = 5;
    }
    new Dot(e.clientX - canvas.getBoundingClientRect().left,
    e.clientY - canvas.getBoundingClientRect().top,
    color);
}



function mainLoop(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    Dot.update();
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);



function fill(width, height){
    for(var i = 0; i < width; i++){
        for(var j = 0; j < height; j++){
            new Dot(
                (i + 1) * canvas.clientWidth / (width + 1),
                (j + 1) * canvas.clientHeight / (height + 1),
                Math.floor(Math.random() * maxColors)
            );
        }
    }
}

function help(){
    console.log("\nclick m1 and m2 to place dots with color charges")
    console.log("\nuse shift and control to change the colors of the dots")
    console.log("\nenter fill(w, h) in the console to fill the field with a grid of dots with 'w' rows and 'h' columns")
    console.log("\nedit the game to your liking using these parameters")
    if(dotRadius == 8){
        console.log(" - 'dotRadius = 8(default)' - change the radii of the dots")
    } else{
        console.log(" - 'dotRadius = " + dotRadius + "' - change the radii of the dots")

    }
    if(maxColors == 3){
    console.log(" - 'maxColors = 3(default)' - change how many different color charges exist in the field - Min: 2 - Max: 6")
    } else{
        console.log(" - 'maxColors = " + maxColors + "' - change how many different color charges exist in the field - Min: 2 - Max: 6")

    }
    if(colorIntensity == 1){
        console.log(" - 'colorIntensity = 1(default)' - change the intensity of the attractive and repulsive forces of the dots")
    } else{
        console.log(" - 'colorIntensity = " + colorIntensity + "' - change the intensity of the attractive and repulsive forces of the dots")
    }
    if(frictionCoefficient == 1){
        console.log(" - 'frictionCoefficient = 1(default)' - change the force of friction applied when dots collide - Min: 1 - Max: 0")
    } else{
        console.log(" - 'frictionCoefficient = " + frictionCoefficient + "' - change the force of friction applied when dots collide - Min: 1 - Max: 0")
    }

}