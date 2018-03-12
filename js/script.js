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
  // 形状选择的区域
  let shapeSelectedIndex = $('#shape')[0].selectedIndex
  //是否加入延迟 默认非延迟 延迟只在切换形状时候出现
  let delayed = false
  // 链表引入
  let LinkedList = tools.linklist()
  let body = document.getElementsByTagName('body')[0]
  let times = 72
  let space = Math.floor(width / times)

  function randomNumber(i) {
    return Math.floor(Math.random() * 60 + 15 * i)
  }

  function pointMaker() {
    let pointLinkedList = new LinkedList
    for (let i = 0; i < times + 1; i++) {
      let xDisten = width - space * i
      let yDisten = randomNumber(i)
      let temp = [xDisten, yDisten]
      if (!pointLinkedList.head.element) {
        pointLinkedList.head.element = temp
      } else {
        pointLinkedList.push(temp)
      }
    }
    return pointLinkedList
  }
  let points = pointMaker()

  function paint(e) {
    let x = e.x + randomNumber(-3)
    let y = e.y + randomNumber(-3)
    let currentHead = points.head
    con.clearRect(0, 0, width, height)
    /**
     * 内循环跟外循环的循环次数的和应该维持在 times 次 以下
     * shape : 1 线 2 面 3以上 体
     */
    let shape = shapeSelectedIndex
    let counterOut = times - shape
    for (let j = 0; j < counterOut; j++) {
      if (!currentHead) {
        return
      }
      con.beginPath()
      con.moveTo(currentHead.element[0], currentHead.element[1])
      /** 
       * currentHeadInner : 内循环的头部
       */
      let currentHeadInner = currentHead
      for (let i = 0; i < times - counterOut; i++) {
        if (!currentHeadInner.next) {
          return
        }
        con.lineTo(currentHeadInner.next.element[0], currentHeadInner.next.element[1])
        currentHeadInner = currentHeadInner.next
      }
      let color = `hsla(${5 * j},100%,70%,${j / 72})`
      con.fillStyle = color
      con.strokeStyle = color
      con.lineJoin = 'round'
      con.closePath()
      con.fill()
      con.stroke()
      currentHead = currentHead.next
    }

    points.decapitate().push([x, y])
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
  window.addEventListener('orientationchange' in window ? orientationchange : 'resize', function () {
    canvas.width = document.documentElement.clientWidth
    canvas.heigt = document.documentElement.clientHeight
  })
  // 形状改变部分
  $('#shape').on('change', function (e) {
    e.stopPropagation()
    shapeSelectedIndex = $(this)[0].selectedIndex
    delayed = true
    paint(e);
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
