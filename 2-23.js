let context = document.getElementById('canvas2').getContext('2d'),
    context = canvas.getContext('2d'),
    ARROW_MARGIN = 30,
    POINT_RADIUS = 7,
    POINTS = [
        { x: context.width - ARROW_MARGIN,
          y: context.height - ARROW_MARGIN},
        { x: context.width - ARROW_MARGIN * 2,
          y: context.height - ARROW_MARGIN},
        { x: POINT_RADIUS,
          y: canvas.height / 2},
        { x: ARROW_MARGIN,
          y: canvas.height /2 - ARROW_MARGIN},
        { x: canvas.width - ARROW_MARGIN,
          y: ARROW_MARGIN},
        { x: canvas.width - ARROW_MARGIN,
          y: ARROW_MARGIN * 2},
    ];

function drawPoint(x, y, strokeStyle, fillStyle) {
    context.beginPath();
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
    context.lineWidth = 0.5;
    context.arc(x, y, POINT_RADIUS, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
}

function f() {
    
}
