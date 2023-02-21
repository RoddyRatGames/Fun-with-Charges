class Dot{
    constructor(x, y, charge){
        this.charge = charge;
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        dots.push(this);
    }

    static getForce(d1, d2){
        let dist = d1.pos.subtract(d2.pos);
        let force = 0;
        if(dist.mag() != 0){
            force = (d1.charge * d2.charge) / (dist.mag()**2);
        }
        return dist.unit().multiply(force);
    }

    bound(x1, y1, x2, y2){
        if(this.pos.x <= x1){
            this.pos.x += x1 - this.pos.x;
        }
        if(this.pos.x >= x2){
            this.pos.x += x2 - this.pos.x;
        }
        if(this.pos.y <= y1){
            this.pos.y += y1 - this.pos.y;
        }
        if(this.pos.y >= y2){
            this.pos.y += y2 - this.pos.y;
        }
    }

    static detectCollision(d1, d2){
        if(2 * RADIUS >= d2.pos.subtract(d1.pos).mag()){
            return true;
        } else{
            return false;
        }
    }

    static collisionResponse(d1, d2){
        let dist = d1.pos.subtract(d2.pos);
        let depth = 2 * RADIUS - dist.mag();
        let response = dist.unit().multiply(depth / 2);
        d1.pos = d1.pos.add(response);
        d2.pos = d2.pos.add(response.multiply(-1));
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, RADIUS, 0, Math.PI*2);
        if(this.charge > 0){
            ctx.fillStyle = "#0055AA";
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.pos.x - 3 * RADIUS / 4, this.pos.y - RADIUS / 4, 3 * RADIUS / 2, RADIUS / 2);
            ctx.rect(this.pos.x - RADIUS / 4, this.pos.y - 3 * RADIUS / 4, RADIUS / 2, 3 * RADIUS / 2);

        } else{
            ctx.fillStyle = "#AA0055";
            ctx.fill();
            ctx.beginPath();
            ctx.rect(this.pos.x - RADIUS / 2, this.pos.y - RADIUS / 4, RADIUS, RADIUS / 2);
        }
        ctx.fillStyle = "#000000";
        ctx.fill();
    }
}