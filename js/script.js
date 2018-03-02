document.addEventListener("DOMContentLoaded", function (event) {
  let canvas = document.getElementById('canvas')
  canvas.width = document.documentElement.clientWidth
  canvas.height = document.documentElement.clientHeight
  let width = canvas.width
  let height = canvas.height
  let con = canvas.getContext('2d')
  if (!con) {
    return
  }
  // 链表引入
  let LinkedList = tools.linklist()
  let body = document.getElementsByTagName('body')[0]
  let times = 50
  let space = Math.floor(width / times)

  function randomNumber(i) {
    return Math.floor(Math.random() * 60 + 15 * i)
  }

  function pointMaker() {
    // let pointArr = []
    let pointLinkedList = new LinkedList
    // console.log(pointArrTep)
    for (let i = 0; i < times + 1; i++) {
      let xDisten = width - space * i
      let yDisten = randomNumber(i)
      let temp = [xDisten, yDisten]
      // pointArr.push(temp)
      if (!pointLinkedList.head.element) {
        pointLinkedList.head.element = temp
      } else {
        pointLinkedList.push(temp)
      }
    }
    return pointLinkedList
  }
  let points = pointMaker()
  console.log(points)
  function paint(e) {
    let x = e.x + randomNumber(-3)
    let y = e.y + randomNumber(-3)
    let currentHead = points.head
    let currentHeadNext = currentHead.next
    con.clearRect(0, 0, width, height)
    points.decapitate()
    points.push([x, y])
    for (let j = 0; j < times - 2; j++) {
      if (!currentHead) {
        return
      }
      con.beginPath()
      con.moveTo(currentHead.element[0], currentHead.element[1])
      // for (let k = 1; k < 4; k++) {
      //   con.lineTo(point[j + k][0], point[j + k][1])
      // }
      for (let i = 0; i < 1; i++) {
        if (!currentHeadNext) {
          return
        }
        con.lineTo(currentHeadNext.element[0], currentHeadNext.element[1])
        currentHeadNext = currentHeadNext.next
      }
      
      let color = `hsla(${10 * j},100%,70%,${j / 50})`
      con.fillStyle = color
      con.strokeStyle = color
      con.lineJoin = 'round'
      con.closePath()
      con.fill()
      con.stroke()
      currentHead = currentHead.next
    }
  }
  // 移动监听 paint
  body.addEventListener('mousemove', paint, false)

  // 单击取消对paint的监听
  body.addEventListener('click', function () {
    body.removeEventListener('mousemove', paint, false)
  }, false)

  // 双击恢复 监听paint
  body.addEventListener('dblclick', function () {
    body.addEventListener('mousemove', paint, false)
  }, false)

  let normal_title = document.title;
  // 监听是否离开当前标签页
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      document.title = '(●—●)记得回来';
    } else document.title = normal_title;
  });
  // 拉伸
  window.addEventListener('resize', function () {
    canvas.width = document.documentElement.clientWidth
    canvas.heigt = document.documentElement.clientHeight
  })
  // 中间hover部分
  let container = document.getElementById('container')
  let containerW = container.clientWidth * (-1)
  let containerH = container.clientHeight
  let normal = 'translateX(-50%) translateY(-50%)'
  container.addEventListener('mousemove', function (e) {
    let percentX = e.layerX / containerW
    let percentY = e.layerY / containerH
    this.style.transform = normal + ' rotateX(' + percentY * 10 + 'deg) rotateY(' + percentX * 10 + 'deg)'
  }, false)

  container.addEventListener('mouseleave', function (e) {
    this.style.transform = normal
  })
});