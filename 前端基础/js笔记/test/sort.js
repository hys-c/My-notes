// 插入排序思想：前面的局部有序性，最快O（n），最慢（n^2）
function insert_sort(arr) {
  let len = arr.length;
  for (let i = 2; i < len; i++) {
    let tmp = arr[i];
    for (let j = i - 1; j >= 0 && arr[j] > tmp; j--) {
      arr[j + 1] = arr[j];
      arr[j] = tmp;
    }
  }
}

// 选择排序的思想：每次找到最小值放在前面

function select_sort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (min !== i) {
      let tmp = arr[min];
      arr[min] = arr[i];
      arr[i] = tmp;
    }
  }
}

// 冒泡排序
function bubble_sort(arr) {
  let len = arr.length
  let change = 1
  for(let i = 0;i < len - 1 && change != 0 ;i++) {
    change = 0
    for(let j = 0;j < len - i - 1;j++) {
      if(arr[j] > arr[j+1]) {
        let tmp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = tmp
        change = 1
      }
    }
  }
}

// 快速排序
function quick_sort(arr, l, r) {
  if(l >= r) {
    return
  }
  let i = l, j = r, key = arr[l]
  while(i < j) {
    while(i < j && arr[j] > key) {
      j--
    }
    if(i < j) {
      arr[i] = arr[j]
      i++
    }
    while(i < j && arr[i] < key) {
      i++
    }
    if(i < j) {
      arr[j] = arr[i]
      j--
    }
  }
  arr[i] = key
  quick_sort(arr, l, i)
  quick_sort(arr, i + 1, r)
}

// 归并排序
function merge_sort(arr, l, r) {
  if(l < r) {
    let mid = Math.floor((l + r) / 2)
    merge_sort(arr, l, mid)
    merge_sort(arr, mid + 1, r)
    merge(arr, l, mid, r)
  }
}
function merge(arr, l, mid, r) {
  let i = l, j = mid + 1, k = 0, tmp = []
  while(i <= mid && j <= r) {
    if(arr[i] > arr[j]) {
      tmp[k++] = arr[j]
      j++
    } else {
      tmp[k++] = arr[i]
      i++
    }
  }
  if(i <= mid) {
    tmp[k++] = arr[i++]
  }
  if(j <= r) {
    tmp[k++] = arr[j++]
  }
  for(let x = 0;x < k;x++) {
    arr[x + l] = tmp[x]
  }
}