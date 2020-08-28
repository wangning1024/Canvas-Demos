let context = document.getElementById('canvas').getContext('2d');

function drawDashedLine(context, x1, y1, x2, y2, dashLength) {
    dashLength = dashLength === undefined ? 5 : dashLength;

    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    // 虚线份数
    let numDashes = Math.floor(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength
    );
    for (let i = 0; i < numDashes; ++i) {
        context[i % 2 === 0 ? 'moveTo' : 'lineTo']
        (x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
    }
    context.stroke();
}

context.lineWidth = 3;
context.strokeStyle = 'blue';

drawDashedLine(context, 20, 20, context.canvas.width - 20, 20);

drawDashedLine(context, context.canvas.width - 20, 20,
    context.canvas.width - 20, context.canvas.height - 20, 10);

drawDashedLine(context, context.canvas.width - 20, context.canvas.height - 20,
    20,context.canvas.height - 20, 15);

drawDashedLine(context, 20, context.canvas.height - 20, 20, 20, 2);

drawDashedLine(context, 20, 20,
    context.canvas.width - 20, context.canvas.height - 20, 30);