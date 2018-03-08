;
(function (global) {
  global.tools = {
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
      }
      Node.prototype = {
        constructor: Node
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
        this.head = node? new Node(node) : new Node
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
          var currNode = this.head
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
          var current = this.find(item)
          var newNode = new Node(newElement)
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
        push: function (newElement) {
          var tail = this.tail
          var newNode = new Node(newElement)
          newNode.parent = this
          tail.next = newNode
          newNode.previous = tail
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
          var current = this.find(item)
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
          var currNode = this.head
          var temp
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
          var tempHead = this.find(item_0)
          var tempTail = this.find(item_1)
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
    }
  }
})(window)