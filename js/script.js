document.addEventListener("DOMContentLoaded", function (event) {
  let canvas = document.getElementById('canvas')
  let con = canvas.getContext('2d')
  if (!con) {
    return
  }
  const ISPC = (function () {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)) {
      return false
    } else {
      return true
    }
  })();
  // alert(ISPC)
  // 获取设备的像素比
  let ratio = getPixelRatio(con)
  let width = canvas.width = document.documentElement.clientWidth * ratio
  let height = canvas.height = document.documentElement.clientHeight * ratio

  // 高清屏幕缩放
  canvas.style.transform = `scale(${1 / ratio})`

  // 形状选择的区域
  let shapeSelectedIndex = $('#shape')[0].selectedIndex
  // 是否准备变形
  let shapeChanging = false
  // 链表引入
  let LinkedList = tools.linklist()
  let body = document.getElementsByTagName('body')[0]
  let times = 60
  let space = Math.floor(width / times)

  // 设备的像素比函数
  function getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };

  function randomNumber(i) {
    return Math.floor(Math.random() * 60 + 15 * i)
  }

  function pointMaker() {

    // let pointLinkedList = new LinkedList
    // for (let i = 0; i < times + 1; i++) {
    //   let xDisten = width - space * i
    //   let yDisten = randomNumber(i)
    //   let temp = [xDisten, yDisten]
    //   if (!pointLinkedList.head.element) {
    //     pointLinkedList.head.element = temp
    //   } else {
    //     pointLinkedList.push(temp)
    //   }
    // }

    let CirDots = tools.cirdots()
    let pointLinkedList = new CirDots(
      width,
      height,
      times,
      true,
      30
    ).render();

    console.log(pointLinkedList)
    return pointLinkedList
  }
  let points = pointMaker()
  paint();
  let autoId = setInterval(function () {
    let headEle = points.head.element;
    points.decapitate().push(headEle)
    paint();
  }, 1000)
  function paint(e) {
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
      let color = `hsla(${6 * (j + 1)},100%,70%,${(j / times + .2) * .6})`
      con.fillStyle = color
      con.strokeStyle = color
      con.lineJoin = 'round'
      con.closePath()
      con.fill()
      con.stroke()
      currentHead = currentHead.next
    }
    // 判断是否变形
    if (shapeChanging) {
      shapeChanging = false
      return
    }
    // 判断是否鼠标触发
    if (!e) { return } else {
      let x = e.x + randomNumber(-3)
      let y = e.y + randomNumber(-3)
      points.decapitate().push([x, y])
    }
  }
  // 移动监听 paint autoId
  body.addEventListener('mousemove', paint, false)
  body.addEventListener('mousemove', function () {
    clearInterval(autoId)
  }, false)

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
    shapeChanging = true;
    e.stopPropagation()
    shapeSelectedIndex = $(this)[0].selectedIndex
    paint(e);
    $(this).css({
      'background-image': `url(../images/${shapeSelectedIndex}.svg)`
    })
  })
  // 中间hover部分
  let container = document.getElementById('container')
  let containerW = container.clientWidth * (-1)
  let containerH = container.clientHeight
  let normal = 'translateX(-50%) translateY(10%)'
  container.addEventListener('mousemove', function (e) {
    let percentX = e.layerX / containerW
    let percentY = e.layerY / containerH
    this.style.transform = normal + ' rotateX(' + percentY * 10 + 'deg) rotateY(' + percentX * 10 + 'deg)'
  }, false)

  container.addEventListener('mouseleave', function (e) {
    this.style.transform = normal
  })
});
