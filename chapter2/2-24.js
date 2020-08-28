let canvas3 = document.getElementById('canvas3'),
    context3 = canvas3.getContext('2d'),
    endPoints = [{x: 130, y:70}, {x: 430, y:270}],
    controlPoints = [{x: 130, y: 250}, {x:450, y: 70}];

function drawBezierCurve() {
    context3.strokeStyle = 'blue';

    context3.beginPath();
    context3.moveTo(endPoints[0].x, endPoints[0].y);
    context3.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
        controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
    context3.stroke();
}

function drawEndPoints() {
    context3.strokeStyle = 'blue';
    context3.fillStyle = 'red';
    endPoints.forEach(function (point) {
        context3.beginPath();
        context3.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
        context3.stroke();
        context3.fill();
    })
}

function drawControlPoints() {
    context3.strokeStyle = 'yellow';
    context3.fillStyle = 'blue';
    controlPoints.forEach(function (point) {
        context3.beginPath();
        context3.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
        context3.stroke();
        context3.fill();
    })
}

drawGrid(context3, 'lightgray', 10, 10);
drawControlPoints();
drawEndPoints();
drawBezierCurve();