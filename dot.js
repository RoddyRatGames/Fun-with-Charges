class Dot{
    constructor(x, y, dotCharge){
        this.rad = dotRadius;
        this.charge = dotCharge;
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.forces = new Vector(0, 0);
        dots.push(this);
    }
    

    static getColorForce(d1, d2){
        let dist = d1.pos.subtract(d2.pos);
        if(dist.mag() > 0){
            let forceMag = colorIntensity / (dist.multiply(1 / dotRadius).mag()**2);
            let force = dist.unit().multiply(forceMag);
            if(d1.charge == d2.charge){
                d1.forces = d1.forces.add(force.multiply(maxColors - 1));
                d2.forces = d2.forces.subtract(force.multiply(maxColors - 1));
            } else{
                d1.forces = d1.forces.subtract(force);
                d2.forces = d2.forces.add(force);
            }
        }
    }

    static getForces(d1, d2){
        
        Dot.getColorForce(d1, d2);
    }

    static detectCollision(d1, d2){
        let dist = d1.pos.subtract(d2.pos);
        if(d1.rad + d2.rad >= dist.mag()){
            return true;
        }
    }

    static collisionResolution(d1, d2){
        let dist = d1.pos.subtract(d2.pos);
        let depth = d1.rad + d2.rad - dist.mag();
        let resolution = dist.unit().multiply(depth / 2);
        d1.pos = d1.pos.add(resolution);
        d2.pos = d2.pos.add(resolution.multiply(-1));

    }

    static collisionResponse(d1, d2){
        let velFinal = d1.vel.add(d2.vel).multiply(-1 / 2);
        d1.vel = d1.vel.add(velFinal).multiply(frictionCoefficient);
        d2.vel = d1.vel.subtract(velFinal).multiply(frictionCoefficient);
    }

    detectWall(){
        if(this.pos.x < -2 * this.rad){
            this.pos.x = -this.rad;
            this.vel.x = -this.vel.x;
        } else if(this.pos.x > canvas.clientWidth + 2 * this.rad){
            this.pos.x = canvas.clientWidth + this.rad;
            this.vel.x = -this.vel.x;
        }
        if(this.pos.y < -2 * this.rad){
            this.pos.y = -this.rad;
            this.vel.y = -this.vel.y;
        } else if(this.pos.y > canvas.clientHeight + 2 * this.rad){
            this.pos.y = canvas.clientHeight + this.rad;
            this.vel.y = -this.vel.x;
        }
    }

    getSVA(){
        this.acc = this.forces;
        this.forces = new Vector(0, 0);
        this.vel = this.vel.add(this.acc);
        this.acc = new Vector(0, 0);
        this.pos = this.pos.add(this.vel);
        
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI);
        switch(this.charge) {
            case 0:
              ctx.fillStyle = '#ff0000';
              break;
            case 1:
                ctx.fillStyle = '#0000ff';
                break;
            case 2:
                ctx.fillStyle = '#00ff00';
                break;
            case 3:
                ctx.fillStyle = '#ffff00';
                break;
            case 4:
                ctx.fillStyle = '#ff00ff';
                break;
            case 5:
                ctx.fillStyle = '#00ffff';
                break;
            default:
                ctx.fillStyle = 'ffffff';
        }
        ctx.fill();
    }

    static update(){
        dots.forEach((d1, i) => {
            for(var j = i + 1; j < dots.length; j++){
                if(Dot.detectCollision(dots[i], dots[j])){
                    Dot.collisionResolution(dots[i], dots[j]);
                    Dot.collisionResponse(dots[i], dots[j]);
                }
                Dot.getForces(dots[i], dots[j]);
            }
            d1.detectWall();
            d1.getSVA();
            d1.draw();
        });
    }
}