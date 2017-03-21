let canvas = document.getElementById('canvas')
let width = canvas.width
let height = canvas.height
let con = canvas.getContext('2d')
let body = document.getElementsByTagName('body')[0]

function randomNumber() {
    return Math.floor(Math.random() * 100 + 100)
}

function arrMaker() {
    let pointArr = []
    for (let i = 0; i < 36; i++) {
        let xDisten = 39 * i
        let yDisten = randomNumber()
        let temp = [xDisten, yDisten]
        pointArr.push(temp)
    }
    return pointArr
}
function paint() {
    con.clearRect(0, 0, width, height)
    let point = arrMaker()
    for (let j = 0; j < 34; j++) {
        con.beginPath()
        con.moveTo(point[j][0], point[j][1])
        con.lineTo(point[j + 1][0], point[j + 1][1])
        con.lineTo(point[j + 2][0], point[j + 2][1])
        con.fillStyle = `hsla(${360 - 12 * j},100%,70%,.7)`
        con.fill()
        con.closePath()
    }
}
let timer = setInterval(function () {
    // paint()
}, 1700)
body.addEventListener('click', function () {
    paint()
}, false)
paint()
