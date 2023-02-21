const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//intensity scale for all dot charges
const INTENSITY = 1;
//population scale for generating grid
const SCALE = 0;
//ratio of repeling dots to binding
const RATIO = 3;
//strength of binding dots
const STRENGTH = 6;
//radii of the dots
const RADIUS = 4;
//coeffecient of friction
const DRAG = 0.9;


//array of dots
let dots = [];

//make dots
for(var i = 0; i < SCALE; i++){
    for(var j = 0; j < SCALE; j++){
        let charge;
        if(Math.floor(Math.random() * (RATIO + 1)) % (RATIO + 1) == 0){
            charge = STRENGTH * INTENSITY;
        }
        else{
            charge = -INTENSITY;
        }
        new Dot((i + 1) * canvas.clientWidth / (SCALE + 1),(j + 1) * canvas.clientHeight / (SCALE + 1), charge);
    }
}

onclick = (e) => { 
    new Dot(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top, -INTENSITY);
}

canvas.oncontextmenu = (e) => {
    e.preventDefault();
    new Dot(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top, STRENGTH * INTENSITY);
    
  }

//main
function mainLoop(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    //main loop
    dots.forEach((d1, i) => {
        //draw dots
        d1.draw();

        //iterate through each pair, totaling up forces and checking collision
        d1.acc = new Vector(0, 0);
        dots.forEach((d2, j) => {
            if(i != j){
                d1.acc = d1.acc.add(Dot.getForce(d1, d2));
                if(Dot.detectCollision(dots[i], dots[j])){
                    Dot.collisionResponse(dots[i], dots[j]);
                }

            }
        })

        //update velocity and position
        d1.vel = d1.vel.add(d1.acc).multiply(DRAG);
        d1.pos = d1.pos.add(d1.vel);

        //hit walls
        d1.bound(0, 0, canvas.clientWidth, canvas.clientHeight);
    })
    requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);