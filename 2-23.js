let canvas2 = document.getElementById('canvas2'),
    context2 = canvas2.getContext('2d'),
    ARROW_MARGIN = 30,
    POINT_RADIUS = 7,
    POINTS = [
        { x: canvas2.width - ARROW_MARGIN,
          y: canvas2.height - ARROW_MARGIN}, // 右下角控制点
        { x: canvas2.width - ARROW_MARGIN * 2,
          y: canvas2.height - ARROW_MARGIN}, // 右下角锚点
        { x: POINT_RADIUS,
          y: canvas2.height / 2}, // 左侧控制点
        { x: ARROW_MARGIN,
          y: canvas2.height /2 - ARROW_MARGIN}, // 左侧锚点
        { x: canvas2.width - ARROW_MARGIN,
          y: ARROW_MARGIN}, // 右上方的控制点
        { x: canvas2.width - ARROW_MARGIN,
          y: ARROW_MARGIN * 2}, // 右上方的锚点
    ];

function drawPoint(x, y, strokeStyle, fillStyle) {
    context2.beginPath();
    context2.fillStyle = fillStyle;
    context2.strokeStyle = strokeStyle;
    context2.lineWidth = 0.5;
    context2.arc(x, y, POINT_RADIUS, 0, Math.PI * 2, false);
    context2.fill();
    context2.stroke();
}

function drawBezierPoints() {
    let i,
        strokeStyle,
        fillStyle;
    for (i = 0; i < POINTS.length; i++) {
        fillStyle = i % 2 === 0 ? 'white' : 'blue';
        strokeStyle = i % 2 === 0 ? 'blue' : 'white';
        drawPoint(POINTS[i].x, POINTS[i].y, strokeStyle, fillStyle);
    }
}

function drawArrow() {
    context2.strokeStyle = 'white';
    context2.fillStyle = 'cornflowerblue';
    context2.moveTo(canvas2.width - ARROW_MARGIN, ARROW_MARGIN * 2);
    context2.lineTo(canvas2.width - ARROW_MARGIN, canvas2.height - ARROW_MARGIN * 2);
    context2.quadraticCurveTo(POINTS[0].x, POINTS[0].y, POINTS[1].x, POINTS[1].y);
    context2.lineTo(ARROW_MARGIN, canvas2.height / 2 + ARROW_MARGIN);
    context2.quadraticCurveTo(POINTS[2].x, POINTS[2].y, POINTS[3].x, POINTS[3].y);
    context2.lineTo(canvas2.width - ARROW_MARGIN * 2, ARROW_MARGIN);
    context2.quadraticCurveTo(POINTS[4].x, POINTS[4].y, POINTS[5].x, POINTS[5].y);
    context2.fill();
    context2.stroke();
}

context2.clearRect(0, 0, canvas2.width, canvas2.height);
drawArrow();
drawBezierPoints();