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

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return _memory.get(this.ptr + index);
  }
}

function URLify(str) {
  let input = str;
  let output = input.split(" ").join("%20");
  return output;
}

function arrayFilter(array, lessThan) {
  if (array.length < 1) {
    return [];
  }

  const val = array.pop();
  if (val < lessThan) {
    let returnedArr = arrayFilter(array, lessThan);
    returnedArr.push(val);
    return returnedArr;
  } else {
    return arrayFilter(array, lessThan);
  }
}

function maxSum(array, current, sum, max) {
  if (current >= array.length - 1) {
    return max;
  }

  sum += array[current];
  if (sum > max) {
    max = sum;
  }
  current++;
  return maxSum(array, current, sum, max);
}

function mergeArrays(array1, array2) {
  if (array1.length === 0 && array2.length === 0) {
    return [];
  }

  let a1 = array1.shift();
  let a2 = array2.shift();

  const mergedBoi = mergeArrays(array1, array2);
  if (!a1) {
    mergedBoi.unshift(a2);
  } else if (!a2) {
    mergedBoi.unshift(a1);
  } else if (a1 > a2) {
    mergedBoi.unshift(a1);
    mergedBoi.unshift(a2);
  } else if (a1 < a2) {
    mergedBoi.unshift(a2);
    mergedBoi.unshift(a1);
  } else {
    mergedBoi.unshift(a1);
    mergedBoi.unshift(a2);
  }
  return mergedBoi;
}

function removeChars(str, filter) {
  for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < filter.length; j++) {
      if (str.charAt(i) === filter.charAt(j)) {
        let beforeCut = str.substring(0, i);
        let leftOver = str.substring(i + 1, str.length);
        str = beforeCut + leftOver;
      }
    }
  }
  return str;
}

function products(array) {
  let newArr = [];
  let sum = 1;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i !== j) {
        sum *= array[j];
      }
    }
    newArr.push(sum);
    sum = 1;
  }
  return newArr;
}

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  // arr.push(3);
  // console.log(arr);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);

  // console.log(arr);
  //question answers:
  //1 pushes: length = 1 | capacity = 3 | mem address = 0
  //6 pushes: length = 6 | capacity = 12 | mem address = 3

  // arr.pop();
  // arr.pop();
  // arr.pop();
  // console.log(arr);
  //question answers:
  // 3 pops: length = 3 | capacity = 12 | mem address = 3

  // console.log(arr[0]);
  // console.log(arr.get(0));
  //question answers:
  // that function doesnt exist its suppost to be .get()

  // arr.push("tauhida");
  // console.log("testing ", arr);
  //question answers:
  //the length increases because an item was added but the capacity and memory stay the same because no rezise was needed
  // tauhida cant be printed because it is a string and memory only takes floats
  // the purpuse of resize is to increase the capacity acordingly of the array before anything gets push

  // 5. URLify a string
  // console.log(URLify("tauhida parveen"));
  // console.log(URLify("www.thinkful.com /tauh ida parv een"));

  // 6. Filtering an array
  let testArray = [1, 3, 5, 10, 11];
  console.log("Result", arrayFilter(testArray, 5));
  // let testArray = [1, 3, 5, 10, 11];
  // console.log("Result", arrayFilter(testArray, 5));

  // console.log(maxSum([4, 6, -3, 5, -2, 1], 0, 0, 0));
  // let testArray = [1, 3, 5, 10, 11];
  // console.log("Result", arrayFilter(testArray, 5));

  //8. merge arrays
  let array1 = [1, 3, 6, 8, 11];
  let array2 = [2, 3, 5, 8, 9, 10];
  console.log("Result", mergeArrays(array1, array2));

  //9. Remove characters
  console.log(removeChars("Battle of the Vowels: Hawaii vs. Grozny", "aeiou"));

  //10. Products
  console.log(products([1, 3, 9, 4]));

  // let array1 = [1, 3, 6, 8, 11];
  // let array2 = [2, 3, 5, 8, 9, 10];
  // console.log("Result", mergeArrays(array1, array2));

  //11. outputs an array where each index is the product of all the numbers in the array
  console.log(
    "Result",
    onesAndZeros([
      [1, 0, 1, 1, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ])
  );
}

function onesAndZeros(array) {
  //for each array check the value if it's 0.
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      const val = array[i][j];
      if (val === 0) {
        for (let y = 0; y < array[i].length; y++) {
          if (array[i][y] === 1) {
            array[i][y] = 20;
          }
        }

        for (let z = 0; z < array.length; z++) {
          if (array[z][j] === 1) {
            array[z][j] = 20;
          }
        }
      }
    }
  }

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 20) {
        array[i][j] = 0;
      }
    }
  }

  return array;
}

main();
