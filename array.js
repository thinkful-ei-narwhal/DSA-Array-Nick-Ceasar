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

  //array ptr = starting block
  //if you want to to something in its index,
  //you add array ptr + index

  push(value) {
    //allocate memory if needed
    if (this.length >= this._capacity) {
      console.log("length ", this.length);
      this.resize(this.length + 1 * Array.SIZE_RATIO);
    }
    _memory.set(this.ptr + this.length, value);
    this.length++;
    console.log("capacity ", this._capacity);
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

  pop(){
    if(this.length===0){
      throw new Error('Index error');
    }
    const value= _memory.get(this.ptr + this.length);
    this.length--;
    return value; 
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
}

main();
