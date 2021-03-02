let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

test0 = document.getElementById('test0');
test01 = document.getElementById('test01');
test1 = document.getElementById('test1');
test2 = document.getElementById('test2');
test21 = document.getElementById('test21');
test3 = document.getElementById('test3');

test0.innerText = 'width: ' + canvas.width + ', height: ' + canvas.height;

function windowToCanvas(canvas, x, y) {
    let bbox = canvas.getBoundingClientRect(); // 获取canvas元素的边框

    test01.innerText = 'bbox.left: ' + bbox.left + ', bbox.top: ' + bbox.top;
    test3.innerText = 'bbox-width: ' + bbox.width + ', bbox-height: ' + bbox.height;
    return {
        // 当canvas元素大小与绘图表面大小不相符时，将这两个坐标进行缩放
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}

canvas.onmousemove = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);

    test1.innerText = 'mousePosition: (' + e.clientX.toFixed(0) + ', ' + e.clientY.toFixed(0) + ')';

    test2.innerText = 'relattionPositon: (' + loc.x.toFixed(0) + ', ' + loc.y.toFixed(0) + ')';

    let bbox = canvas.getBoundingClientRect(); // 获取canvas元素的边框
    test21.innerText = 'no-relattionPositon: (' + (e.clientX - bbox.left).toFixed(0) + ', ' + (e.clientY - bbox.top).toFixed(0) + ')';

    test2.innerText = 'relattionPositon: (' + loc.x.toFixed(0) + ', ' + loc.y.toFixed(0) + ')';

};

context.moveTo(100, 100);
context.lineTo(200, 200);
context.stroke();