import { noise } from './perlin.js'

let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Circle {
    constructor(x, y, radius, color,offset) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.offset = offset;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
}

const circles = [];

for (let i = 0; i < 100; i++) {
    circles.push(new Circle(-10, -10, 10, `hsl(${Math.random()*360},100%,50%)`,i*0.01));
}

let increment = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    circles.forEach(circle => {
        circle.draw();
        circle.x = noise(increment + circle.offset + 10) * canvas.width;
        circle.y = noise(increment + circle.offset) * canvas.height;
    })

    increment += 0.005;
}

animate();