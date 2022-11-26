let canvas = document.getElementById("canvas"); // get canvas
let ctx = canvas.getContext("2d"); // get context

// ctx.canvas.width = 500; // set canvas width to window width
// ctx.canvas.height = 500; // set canvas height to window height
// ctx.canvas.width = window.innerWidth; // set canvas width to window width
// ctx.canvas.height = window.innerHeight; // set canvas height to window height

ctx.canvas.width = window.innerWidth/2; // get window width
ctx.canvas.height = window.innerHeight/2; // get window height

let allCircles = []; // array to hold all circles

function Circles(x, y, dx, dy, radius) { // constructor function
    let randomColor = '#' + Math.floor(Math.random() * 19777215).toString(16); // random color
    this.x = x; // x position
    this.y = y; // y position
    this.dx = dx; // x velocity
    this.dy = dy; // y velocity
    this.radius = radius; // circle radius

    this.draw = function () { // draw function
        ctx.beginPath(); // start drawing
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // draw circle
        ctx.globalAlpha = 0.8; // set opacity
        ctx.lineWidth = 1; // set line width to 0.1
        ctx.strokeStyle = randomColor; // set stroke color
        ctx.stroke();

    }

    this.updateCircle = function () { // update function
        if (this.x + this.radius > ctx.canvas.width || this.x - this.radius < 0) {
            // if circle hits right or left wall
            this.dx = -this.dx; // reverse direction
        }

        if (this.y + this.radius > ctx.canvas.height || this.y - this.radius < 0) {
            // if circle hits top or bottom wall
            this.dy = -this.dy; // reverse direction
        }

        this.x += this.dx; // move circle
        this.y += this.dy; // move circle

        this.draw(); // draw circle

    }
}

for (let i = 0; i < 50; i++) { // create 50 circles

    let radius = 40; // circle radius
    let randomX = Math.random() * (ctx.canvas.width - radius * 2) + radius; // random x position
    let randomY = Math.random() * (ctx.canvas.height - radius * 2) + radius; // random y position

    let randomDX = (Math.random() - 0.5) * 5; // random x velocity
    let randomDY = (Math.random() - 0.5) * 5; // random y velocity


    allCircles.push(new Circles(randomX, randomY, randomDX, randomDY, radius)); // push circle to array
}

function animate() { // animate function

    requestAnimationFrame(animate); // call animate function

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

    for (let i = 0; i < allCircles.length; i++) { // loop through all circles
        allCircles[i].updateCircle(); // update circle
    }
}

animate(); // call animate function