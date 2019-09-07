;
(function (global) {
  global.tools = {
    /**
     * linklist 创建一个链表
     */
    linklist: function () {
      /**
       * 节点
       * @param {*} element 
       */
      function Node(element) {
        /**
         * 节点与节点之间是兄弟关系
         * parent: 节点所处的链表
         * element: 当前节点包含的元素
         * previous: 当前节点的前一个节点
         * next: 当前节点的下一个节点
         * slef: 节点自身
         */
        this.parent = null
        this.element = element || null
        this.previous = null
        this.next = null
        this.self = this
        // this.child = null
        this.childindex = 0
      }
      Node.prototype = {
        constructor: Node,
        update: function (times) {
          this.element = this.child[this.childindex]
          this.childindex = ++this.childindex > times ? 0 : this.childindex
        }
      }
      /**
       * 链表
       * @param {*} node 
       */
      function LinkedList(node) {
        /**
         * head: 链表的头部
         * tail: 链表的尾部
         * slef: 链表自身
         * length: 链表包含的节点数目
         * isCycle: 链表是否头尾链接成环
         */
        this.head = node ? new Node(node) : new Node
        this.head.parent = this
        this.tail = this.head
        this.self = this
        this.length = 1
        this.isCycle = false
      }
      //
      LinkedList.prototype = {
        constructor: LinkedList,
        /**
         * @param {*} item
         * @returns node
         */
        find: function (item) {
          let currNode = this.head
          // 判断暂时存在问题
          while (currNode.element.toString() !== item.toString()) {
            currNode = currNode.next
            if (!currNode) {
              console.error(item + " is not exits.")
              break
            }
          }
          return currNode
        },
        // 在 item 的后面插入元素 newElement
        insert: function (item, newElement) {
          let current = this.find(item)
          let newNode = new Node(newElement)
          newNode.parent = this
          newNode.next = current.next
          current.next = newNode
          newNode.previous = current
          if (newNode.next) {
            newNode.next.previous = newNode
          } else {
            this.tail = newNode
          }
          this.length++
        },
        // 在链表的尾部添加
        push: function (newElement, child) {
          let tail = this.tail
          let newNode = new Node(newElement)
          newNode.parent = this
          tail.next = newNode
          newNode.previous = tail
          if (child) {
            newNode.child = child
          }
          this.tail = newNode

          this.length++
          return this
        },
        // 去除链表的首部元素 未考虑闭合链表
        decapitate: function () {
          if (this.isCycle) {
            console.error('闭合状态不能使用方法 - decapitate')
            return
          }
          this.head = this.head.next
          this.length--
          return this
        },
        // 删除名为 item 的节点
        // 返回要删除的节点
        remove: function (item) {
          let current = this.find(item)
          // 如果没找到这个节点
          if (!current) {
            return
          }
          this.length--
          // 如果要删除的节点是尾节点
          if (!current.next) {
            this.tail = current.previous
            current.previous.next = null
            return current
          }
          // 如果要删除的节点是头节点
          if (!current.previous) {
            this.head = current.next
            current.next.previous = null
            return current
          }
          // 如果要删除的节点是中间的节点
          current.previous.next = current.next
          current.next.previous = current.previous
          return current
        },
        // 反序输出链表
        reverse: function () {
          // 循环链表状态下禁止使用反序
          // if(this.isCycle){
          //   console.warn("you can't use the methods of reverse under ths state of isCycle.")
          //   return
          // }
          let currNode = this.head
          let temp
          while (currNode && currNode.element) {
            temp = currNode.next
            currNode.next = currNode.previous
            currNode.previous = temp

            currNode = currNode.previous
            // 循环状态下检测是否检测到头
            if (currNode == this.head) {
              break
            }
          }

          temp = this.head
          this.head = this.tail
          this.tail = temp
          return this
        },
        // 生成循环链表
        cyclen: function () {
          if (this.isCycle) {
            return
          }
          this.head.previous = this.tail
          this.tail.next = this.head
          this.isCycle = true
          return this
        },
        // 按照 两个元素将链表拆开
        // 禁止在非循环状态下使用
        // item_0 为 head
        // item_1 为 tail
        seprate: function (item_0, item_1) {
          let tempHead = this.find(item_0)
          let tempTail = this.find(item_1)
          if (!this.isCycle) {
            console.warn("you can't use this methods whthout the state of isCycle")
            return
          }
          if (!tempHead || !tempTail) {
            console.warn("please enter right type of Node")
            return
          }
          if (tempHead.next !== tempTail) {
            console.warn("the 2 item must be near")
            return
          }
          this.head = tempHead
          this.tail = tempTail
          this.head.previous = null
          this.tail.next = null
          return this
        }
      }
      return LinkedList
    },

    /**
     * cirdot 创建一组圆上的点
     */
    cirdots: function () {
      /**
       * 点函数
       * @param {画布的宽度} width 
       * @param {画布的高度} height 
       * @param {点数目} items 
       * @param {是否精确排布点} precise 
       * @param {非精确排布点的模糊半径, 应用模糊半径相当于重设单点对圆心的半径} alpha
       */
      function CirDots(width, height, items, precise, alpha) {
        this.width = width;
        this.height = height;
        this.items = items;
        this.precise = precise;
        this.alpha = alpha;
        // 半径为短边的一半
        this.radius = (width < height ? width / 2 : height / 2) - alpha
      }
      CirDots.prototype = {
        constructor: CirDots,
        /**
         * n : 模糊度
         * 产生[-n, n]中间的随机数字
         */
        alphaNumbr: function (n) {
          return Math.random() * 2 * n - n
        },
        render: function () {
          // 正偏角弧度表示
          let deg = (2 * Math.PI / this.items);
          // 创建链表
          let linklist = new (global.tools.linklist());
          let x;
          let y;
          let halfW = this.width / 2;
          let halfH = this.height / 2;
          let radius = this.radius;
          let alpha = this.alpha;
          // 添加节点 节点以双数数组表示
          for (let i = 0; i < this.items; i++) {
            x = halfW + (radius + this.alphaNumbr(alpha)) * Math.sin(deg * i)
            y = halfH - (radius + this.alphaNumbr(alpha)) * Math.cos(deg * i)

            // x = halfW + radius * Math.sin(deg * i)
            // y = halfH - radius * Math.cos(deg * i)
            if (i !== 0) {
              linklist.push({ x, y })
            } else {
              linklist.head.element = { x, y }
            }
          }
          return linklist
        }
      }
      return CirDots
    }
  }
})(window)