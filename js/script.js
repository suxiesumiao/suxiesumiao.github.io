document.addEventListener("DOMContentLoaded", function(event) {
    // canvas部分
    let canvas = document.getElementById('canvas')
    let width = canvas.width
    let height = canvas.height
    let con = canvas.getContext('2d')
    let body = document.getElementsByTagName('body')[0]
    let times = 50
    let space = Math.floor(width / times)

    function randomNumber(i) {
        return Math.floor(Math.random() * 60 + 15 * i)
    }

    function pointMaker() {
        let pointArr = []
        for (let i = 0; i < times + 1; i++) {
            let xDisten = width - space * i
            let yDisten = randomNumber(i)
            let temp = [xDisten, yDisten]
            pointArr.push(temp)
        }
        return pointArr
    }

    let point = pointMaker()

    function paint(e) {
        let x = e.x + randomNumber(-2)
        let y = e.y + randomNumber(-2)
        con.clearRect(0, 0, width, height)
        point.shift()
        point.push([x, y])
        for (let j = 0; j < times - 2; j++) {
            con.beginPath()
            con.moveTo(point[j][0], point[j][1])
            for (let k = 1; k < 4; k++) {
                con.lineTo(point[j + k][0], point[j + k][1])
            }
            let color = `hsla(${10 * j},100%,70%,${j / 50})`
            con.fillStyle = color
            con.strokeStyle = color
            con.fill()
            con.stroke()
            con.closePath()
        }

    }
    // 移动监听 paint
    body.addEventListener('mousemove', paint, false)

    // 单击取消对paint的监听
    body.addEventListener('click', function() {
        body.removeEventListener('mousemove', paint, false)
    }, false)

    // 双击恢复 监听paint
    body.addEventListener('dblclick', function() {
            body.addEventListener('mousemove', paint, false)
        }, false)
        // 监听是否离开当前标签页
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'hidden') {
            normal_title = document.title;
            document.title = '(●—●)记得回来';
        } else document.title = normal_title;
    });

    // 中间hover部分
    let container = document.getElementById('container')
    let containerW = container.clientWidth * (-1)
    let containerH = container.clientHeight
    let normal = 'translateX(-50%) translateY(-50%)'
    container.addEventListener('mousemove', function(e) {
        let percentX = e.layerX / containerW
        let percentY = e.layerY / containerH
        this.style.transform = normal + ' rotateX(' + percentY * 10 + 'deg) rotateY(' + percentX * 10 + 'deg)'
            // console.log(e.layerY)
    }, false)

    container.addEventListener('mouseleave', function(e) {
        this.style.transform = normal
    })

});