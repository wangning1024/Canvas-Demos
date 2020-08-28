// 扩展 CanvasRenderingContext2D 来绘制虚线
let context = document.getElementById('canvas').getContext('2d'),
    moveToFunction = CanvasRenderingContext2D.prototype.moveTo;
CanvasRenderingContext2D.prototype.lastMoveToLocation = {};

CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
    moveToFunction.apply(context, [x, y]);
    this.lastMoveToLocation.x = x;
    this.lastMoveToLocation.y = y;
};

CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {
    dashLength = dashLength === undefined ? 5 : dashLength;

    let startX = this.lastMoveToLocation.x;
    let startY = this.lastMoveToLocation.y;

    let deltaX = x - startX;
    let deltaY = y - startY;
    // 虚线份数
    let numDashes = Math.floor(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength
    );

    for (let i = 0; i < numDashes; ++i) {
        context[i % 2 === 0 ? 'moveTo' : 'lineTo']
        (startX + (deltaX / numDashes) * i, startY + (deltaY / numDashes) * i);
    }

    this.moveTo(x, y);
}