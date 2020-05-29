//A array with all the points da will create the custom shape
let shape = [
    { x: 50, y: 50 },
    { x: 50, y: -50 },
    { x: 0, y: -100 },
    { x: -50, y: -50 },
    { x: -50, y: 50 },
    { x: 0, y: 100 }
];

let centerX = 0;
let centerY = 0;
let pressed = false;
let locked = false;
let ponto = null;

function drawSelectionCircle(x, d) {
    let distance = d;
    x.map(s => {
        if (Math.hypot((mouseX - centerX) - s.x, (mouseY - centerY) - s.y) < distance) {
            stroke(20,30,240);
            circle(s.x, s.y, 10);
        }
    })
}

function nearPoint(shapes, distance) {
    for(let i = 0; i < shapes.length; i++) {
        if(Math.hypot((mouseX - centerX) - shape[i].x, (mouseY - centerY) - shape[i].y) <= distance) {
            return i;
        }
    }
    return null;
};

function setup() {
    //Create a fullscreen canvas
    createCanvas(windowWidth, windowHeight);
    noFill();
    centerX = width / 2;
    centerY = height / 2;
    strokeWeight(2);
}

function draw() {
    background(color('#071359'));
    stroke(color('#05F2DB'));
    translate(width / 2, height / 2);

    ponto = nearPoint(shape, 10);

    beginShape();
        shape.map(s => {
            vertex(s.x, s.y);
        });
    endShape(CLOSE);
    drawSelectionCircle(shape,20);
}

function mousePressed() {
    pressed = true;
    if(ponto != null && pressed) {
        locked = true;
    }
}

function mouseDragged() {
    if(locked) {
        shape[ponto].x = mouseX - centerX;
        shape[ponto].y = mouseY - centerY;
    }
}

function mouseReleased() {
    pressed = false;
    locked = false;
}