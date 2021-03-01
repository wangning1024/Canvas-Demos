let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 鼠标按下位置
let mousedown = {};
// 选取框矩形坐标数据
let rubberbandRectangle = {};

let isDragging = false;

// 开始绘制选取矩形
function rubberbandStart(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = x;
    rubberbandRectangle.top = y;

    // 标识开始绘制
    isDragging = true;
}
// 鼠标点击
canvas.onmousedown = function (ev) {
    let loc = windowToCanvas(canvas, ev.clientX, ev.clientY);
    ev.preventDefault();
    //开始绘制选取矩形
    rubberbandStart(loc.x, loc.y);
};
// 鼠标移动
canvas.onmousemove = function (e) {


}







