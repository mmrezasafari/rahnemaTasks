class Node {
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  prepend(data) {
    const newNode = new Node(data, this.head);
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
  }

  append(data) {
    const appendNode = new Node(data)
    if (!this.head) {
      this.head = appendNode
      this.tail = appendNode
    } else {
      this.tail.next = appendNode
      this.tail = appendNode
    }
  }

  size() {
    let count = 0
    let node = this.head

    while (node) {
      count++
      node = node.next
    }

    return count
  }

  atIndex(index) {
    if (index < 0 || index >= this.size()) return undefined;
    let current = this.head;
    let i = 0;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  }

  join(otherList) {
    if (!(otherList instanceof LinkedList)) {
      throw new Error('Input must be a LinkedList');
    }
    if (!otherList.head) return;
    if (!this.head) {
      this.head = otherList.head;
      this.tail = otherList.tail;
    } else {
      this.tail.next = otherList.head;
      this.tail = otherList.tail;
    }
  }

  map(fn) {
    const newList = new LinkedList();
    let current = this.head;
    while (current) {
      newList.append(fn(current));
      current = current.next;
    }

    return newList;
  }

  filter(fn) {
    const newList = new LinkedList();
    let current = this.head;
    while (current) {
      if (fn(current.data)) {
        newList.append(current.data);
      }
      current = current.next;
    }
    return newList;
  }

  printAll() {
    let node = this.head

    while (node) {
      console.log(node)
      node = node.next
    }
  }
}

const list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)
const list2 = new LinkedList()
list2.append(4)
list2.append(5)
list2.append(6)
list.join(list2)
//list.printAll()
const list3 = list.map((val) => val.data + 1)
//list3.printAll()
const list4 = list.filter((val) => val % 2 == 0)
list4.printAll()
