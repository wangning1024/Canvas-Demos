let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    // 清除绘制线
    eraseAllButton = document.getElementById('eraseAllButton'),
    // 线条颜色
    strokeStyleSelect = document.getElementById('strokeStyleSelect'),
    // 是否显示导引线
    guidewireCheckbox = document.getElementById('guidewireCheckbox'),
    drawingSurfaceImageData,
    mousedown = {},
    rubberbandRect = {},
    dragging = false,
    guidewires = guidewireCheckbox.checked;


function saveDrawingSurface() {
    drawingSurfaceImageData =
        context.getImageData(0, 0, canvas.width, canvas.offsetHeight);
}

function restoreDrawingSurface() {
    context.putImageData(drawingSurfaceImageData, 0, 0);
}

function updateRubberbandRectangle(loc) {
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);
    if (loc.x > mousedown.x) {
        rubberbandRect.left = mousedown.x;
    } else {
        rubberbandRect.left = loc.x;
    }
    if (loc.y > mousedown.y) {
        rubberbandRect.top = mousedown.y;
    } else {
        rubberbandRect.top = loc.y;
    }
}

function drawRubberbandShape(loc) {
    let angle, radius;

    if (mousedown.y === loc.y) {
        radius = Math.abs(loc.x - mousedown.x);
    } else {
        angle = Math.atan(rubberbandRect.height / rubberbandRect.width);
        radius = rubberbandRect.height / Math.sin(angle);
    }

    context.beginPath();
    context.arc(mousedown.x, mousedown.y, radius, 0, Math.PI * 2, false);
    context.stroke();

}


function updateRubberband(loc) {
    updateRubberbandRectangle(loc);
    drawRubberbandShape(loc);
}

canvas.onmousedown = function (e) {
    let loc = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    saveDrawingSurface();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
};
canvas.onmousemove = function (e) {
    let loc;
    if (dragging) {
        e.preventDefault();
        loc = windowToCanvas(e.clientX, e.clientY);
        restoreDrawingSurface();
        updateRubberband(loc);
        if (guidewires) {
            drawGuidewires(loc.x, loc.y);
        }
    }
};
canvas.onmouseup = function (e) {
    let loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    updateRubberband(loc);
    dragging = false;
}

// Controls event handlers
eraseAllButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.offsetHeight);
    drawGrid(context, 'lightgray', 10, 10);
    saveDrawingSurface();
}
strokeStyleSelect.onchange = function (e) {
    context.strokeStyle = strokeStyleSelect.value;
};
guidewireCheckbox.onchange = function (e) {
    guidewires = guidewireCheckbox.checked;
}

context.strokeStyle = strokeStyleSelect.value;
drawGrid(context, 'lightgray', 10, 10);

