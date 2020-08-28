let context = document.getElementById('canvas').getContext('2d');

function draw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, 'lightgray', 10, 10);
    context.save();

    context.shadowColor = 'rgba(200,200,0,0.8)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;

    drawCutouts();
    strokeCutoutShapes();
    context.restore();
}

function drawCutouts() {
    context.beginPath();
    addOuterRectanglePath(); // 顺时针

    addCirclePath();
    addRectanglePath();
    addTrianglePath();
    context.fill();
}

function strokeCutoutShapes() {
    context.save();
    context.strokeStyle = 'rgba(0,0,0,0.7)';

    context.beginPath();
    addOuterRectanglePath();
    context.stroke();

    context.beginPath();
    addCirclePath();
    addRectanglePath();
    addTrianglePath();
    context.restore();
}

function addOuterRectanglePath() {
    context.rect(110, 25, 370, 335); // 顺时针
}

function addCirclePath() {
    context.arc(300, 300, 40, 0, Math.PI * 2, true); // 逆时针
}

function addRectanglePath() {
    rect(310, 55, 70, 35, true); // 逆时针
}

function addTrianglePath() {
    context.moveTo(400, 200);
    context.lineTo(250, 115);
    context.lineTo(200, 200);
    context.closePath();
}

context.fillStyle = 'goldenrod';
draw();