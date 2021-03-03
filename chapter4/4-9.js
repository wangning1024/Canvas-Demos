let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

// 鼠标按下位置
let mousedown = {};
// 选取框矩形坐标数据
let rubberbandRectangle = {};

let isDragging = false;
// 图像数据
let imageData = undefined;

// 开始绘制选取矩形
function rubberbandStart(x, y) {
    mousedown.x = x;
    mousedown.y = y;

    rubberbandRectangle.left = x;
    rubberbandRectangle.top = y;

    // 标识开始绘制
    isDragging = true;
}

// 绘制橡皮筋矩形
function rubberbandStretch(x, y) {
    if (rubberbandRectangle.width > 2*context.lineWidth &&
        rubberbandRectangle.height > 2*context.lineWidth) {
        if (imageData !== undefined) {
            restoreRubberbandPixels();
        }
    }
    // 设置橡皮筋矩形坐标
    setRubberbandRectangle(x, y);

    if (rubberbandRectangle.width > 2*context.lineWidth &&
        rubberbandRectangle.height > 2*context.lineWidth) {
        updateRubberband();
    }
}

// 设置橡皮筋矩形坐标
function setRubberbandRectangle(x, y) {
    rubberbandRectangle.left = Math.min(x, mousedown.x);
    rubberbandRectangle.top  = Math.min(y, mousedown.y);
    rubberbandRectangle.width  = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);
}

function restoreRubberbandPixels() {

    var deviceWidthOverCSSPixels = imageData.width / rubberbandRectangle.width,
        deviceHeightOverCSSPixels = imageData.height / rubberbandRectangle.height;

    context.putImageData(imageData,
        rubberbandRectangle.left * deviceWidthOverCSSPixels,
        rubberbandRectangle.top * deviceHeightOverCSSPixels);
}


function updateRubberband() {
    captureRubberbandPixels();
    drawRubberband();
}
function captureRubberbandPixels() {
    imageData = context.getImageData(rubberbandRectangle.left,
        rubberbandRectangle.top,
        rubberbandRectangle.width,
        rubberbandRectangle.height);

    // context.getImageData(0, 0, canvas.width, canvas.height);

}
function drawRubberband() {
    // 绘制矩形选取框，注意处理边框的宽度
    context.strokeRect(rubberbandRectangle.left + context.lineWidth,
        rubberbandRectangle.top + context.lineWidth,
        rubberbandRectangle.width - 2*context.lineWidth,
        rubberbandRectangle.height - 2*context.lineWidth);
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
    if (isDragging) {
        let loc = windowToCanvas(canvas, ev.clientX, ev.clientY);
        rubberbandStretch(loc.x, loc.y);
    }

}







