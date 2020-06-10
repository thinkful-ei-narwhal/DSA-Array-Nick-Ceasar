const memory = require("./Memory");
const _memory = new memory();

// memory
// allocate(size)
// free(ptr) { }
// copy(toIdx, fromIdx, size)

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = _memory.allocate(this.length);
  }

  //Note: array ptr = starting block
  //if you want to to something in its index,
  //you add array ptr + index

  push(value) {
    //allocate memory if needed
    if (this.length >= this._capacity) {
      //Note: only INCREASES by 3 due to pemdas, I think this
      //is just a constraint of the practice since max is 1024
      //Normally I think reallocation should be larger
      this.resize((this.length + 1) * Array.SIZE_RATIO);
    }
    _memory.set(this.ptr + this.length, value);
    this.length++;
  }

  resize(size) {
    const oldPtr = this.ptr;
    this.ptr = _memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    _memory.copy(this.ptr, oldPtr, this.length);
    _memory.free(oldPtr);
    this._capacity = size;
  }

  pop() {
    if (this.length === 0) {
      throw new Error("Index error");
    }
    const value = _memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (this.length >= this._capacity) {
      this.resize(this.length + 1 * Array.SIZE_RATIO);
    }

    const location = this.ptr + index;
    _memory.copy(location + 1, location, this.length - index);
    _memory.set(location, value);
    this.length++;
  }
}

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);
  console.log(arr);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  console.log(arr);
  //question answers:
  //1 pushes: length = 1 | capacity = 3 | mem address = 0
  //6 pushes: length = 6 | capacity = 6 | mem address = 3

  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
  //question answers:
  // 3 pops: length = 3 | capacity = 6 | mem address = 3

  console.log(arr[0]);
  //empty
  for (let i = 0; i < arr.length; i++) {
    arr[i] = null;
  }
  arr.push("tauhida");
  arr.push("Doubletauhida");
  console.log(arr.length);
  console.log(arr._capacity);

  console.log("testing ", arr);
}

main();
