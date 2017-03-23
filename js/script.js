let canvas = document.getElementById('canvas')
let width = canvas.width
let height = canvas.height
let con = canvas.getContext('2d')
let body = document.getElementsByTagName('body')[0]


let times = 35
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
    let x = e.x + Math.floor(Math.random() * 60 - 30)
    let y = e.y + Math.floor(Math.random() * 60 - 30)
    con.clearRect(0, 0, width, height)
    point.shift()
    point.push([x, y])
    for (let j = 0; j < times - 2; j++) {
        con.beginPath()
        con.moveTo(point[j][0], point[j][1])
        for (let k = 1; k < 4; k++) {
            con.lineTo(point[j + k][0], point[j + k][1])
        }
        let color = `hsla(${10 * j},100%,70%,${j / 40})`
        con.fillStyle = color
        // con.strokeStyle = color
        con.fill()
        // con.stroke()
        con.closePath()
    }
}
body.addEventListener('mousemove', function (e) {
    paint(e)
}, false)