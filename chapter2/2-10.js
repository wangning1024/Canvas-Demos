let context = document.getElementById('canvas').getContext('2d');

function drawTwoArcs() {
    context.beginPath();
    // 非零环绕规则： 从内部向外划线后，若相交处路径顺时针加1，若逆时针减1
    // 两个圆的路径顺序不一致即可出现镂空的剪纸效果
    // 大圆 逆时针绘制
    context.arc(300, 190, 150, 0, Math.PI * 2, true);
    // 小圆 顺时针绘制
    context.arc(300, 190, 100, 0, Math.PI * 2);
    // context.fill(); // 放在这里调用，会有两个路径之间的连接线
    context.stroke();
    context.fill(); // 放在这里调用，两个路径之间的连接线不会出现

    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

function draw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, 'lightgray', 10, 10);
    context.save();

    context.shadowColor = 'rgba(0,0,0,0.8)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;

    drawTwoArcs();

    context.restore();
}

context.fillStyle = 'rgba(100, 140, 230, 0.5)';
context.strokeStyle = context.fillStyle;
draw();