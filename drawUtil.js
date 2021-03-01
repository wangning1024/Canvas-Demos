/**
 * 绘制网格线
 */
function drawGrid(context, color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    for (let i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }
    for (let i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
}

/**
 * 自定义绘制矩形
 */
function rect(x, y, w, h, direction) {
    if (direction) { // 逆时针绘制
        context.moveTo(x, y);
        context.lineTo(x, y + h);
        context.lineTo(x + w, y + h);
        context.lineTo(x + w, y);
        context.closePath();
    } else { // 顺时针绘制
        context.moveTo(x, y);
        context.lineTo(x + w, y );
        context.lineTo(x + w, y + h);
        context.lineTo(x, y + h);
        context.closePath();
    }

}

/**
 * 将窗口坐标转换为canvas的相对坐标
 */
function windowToCanvas(canvas, x, y) {
    let bbox = canvas.getBoundingClientRect(); // 获取canvas元素的边框
    return {
        // 当canvas元素大小与绘图表面大小不相符时，将这两个坐标进行缩放
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };

}

/**
 * 绘制 Guidewires
 */
function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y + 0.5);
    context.lineTo(context.canvas.width, y + 0.5);
    context.stroke();
}
function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, context.canvas.height);
    context.stroke();
}
function drawGuidewires(x, y) {
    context.save();
    context.strokeStyle = 'rgba(0, 0, 230, 0.4)';
    context.lineWidth = 0.5;
    drawVerticalLine(x);
    drawHorizontalLine(y);
    context.restore();
}

/**
 * 绘制虚线
 */
function drawDashedLine(context, x1, y1, x2, y2, dashLength) {
    dashLength = dashLength === undefined ? 5 : dashLength;

    let deltaX = x2 - x1;
    let deltaY = y2 - y1;
    // 虚线长度
    let numDashes = Math.floor(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength
    );
    for (let i = 0; i < numDashes; ++i) {
        context[i % 2 === 0 ? 'moveTo' : 'lineTo']
        (x1 + (deltaX / numDashes) * i, y1 + (deltaY / numDashes) * i);
    }
    context.stroke();
}
