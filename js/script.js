let canvas = document.getElementById('canvas')
let width = canvas.width
let height = canvas.height
let con = canvas.getContext('2d')
let body = document.getElementsByTagName('body')[0]

function randomNumber(i) {
    return Math.floor(Math.random() * 60 + 16 * i)
}

function arrMaker() {
    let pointArr = []
    for (let i = 0; i < 36; i++) {
        let xDisten = width - 39 * i
        let yDisten = randomNumber(i)
        let temp = [xDisten, yDisten]
        pointArr.push(temp)
    }
    return pointArr
}
let point = arrMaker()
function paint() {
    con.clearRect(0, 0, width, height)
        point.push(point.shift())
        // point.reverse()
    for (let j = 0; j < 30; j++) {
        con.beginPath()
        con.moveTo(point[j][0], point[j][1])
        for (let k = 1; k < 5; k++) {
            con.lineTo(point[j + k][0], point[j + k][1])
        }
        let color = `hsla(${10 * j},100%,70%,${j / 100})`
        con.fillStyle = color
        con.strokeStyle = color
        con.fill()
        con.stroke()
        con.closePath()
    }
}
let timer = setInterval(function () {
    paint()
}, 2000)
body.addEventListener('click', function () {
    paint()
}, false)
paint()
