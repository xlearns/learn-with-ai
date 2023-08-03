# 1.两数之和

```js
// 暴力
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] == target) {
        return [i, j];
      }
    }
  }
}
```

```js
function twoSum(arr, target) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (num in obj) {
      return [obj[num], num];
    } else {
      obj[target - num] = i;
    }
  }
}
```

# 11.盛最多水的容器

```js
function maxArea(heights) {
  let max = 0;
  for (let i = 0; i < heights; i++) {
    for (let j = i + 1; j < heights; j++) {
      //水桶的高度取决于左右两边较短的那个高度。假设我们有一个木板组成的水桶，如果其中一侧的高度较高，而另一侧的高度较低，那么水将从较低的那一侧溢出。
      const h = Math.min(height[i], height[j]);
      const w = Math.abs(j - i);
      const area = w * h;
      max = Math.max(area, max);
    }
  }
  return max;
}
```

```js
function maxArea(heights) {
  let left = 0;
  let max = 0;
  let right = heights.length - 1;
  while (left < right) {
    const area = Math.abs(left - right) * Math.min(height[left], height[right]);
    if (area > max) {
      max = area;
    }
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
}
```

# 20.有效的括号

```js
function isValid(str) {
  const stack = [];
  const map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (c in map) {
      stack.push(c);
    } else {
      const top = stack.pop();
      if (!top || c != map[top]) {
        return false;
      }
    }
  }
  return !stack.length;
}
```

```js
const input1 = "()"; // true
const input2 = "()[]{}"; // true
const input3 = "(]"; // false
const input4 = "([)]"; // false

console.log(isValid(input1)); // 输出: true
console.log(isValid(input2)); // 输出: true
console.log(isValid(input3)); // 输出: false
console.log(isValid(input4)); // 输出: false
```

# 15.三数之和

```js
function threeSum(nums) {
  const l = nums.length;
  const res = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < l - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 去除重复的 i
    for (let j = i + 1; j < l - 1; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue; // 去除重复的 j
      for (let k = j + 1; k < l; k++) {
        if (k > j + 1 && nums[k] === nums[k - 1]) continue; // 去除重复的 k
        const a = nums[i];
        const b = nums[j];
        const c = nums[k];
        if (a + b + c == 0) {
          res.push([a, b, c]);
        }
      }
    }
  }
  return res;
}
```

```js
//双指针确定两个值 + for循环确定一个值
function threeSum(nums) {
  const l = nums.length;
  const res = [];
  if (nums.length < 3) return [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < l; i++) {
    if (nums[i] === nums[i - 1]) continue;
    const a = nums[i];
    let left = i + 1;
    let right = l - 1;
    while (left < right) {
      const b = nums[left];
      const c = nums[right];
      const sum = a + b + c;
      if (right === i) {
        right--;
      } else if (sum === 0) {
        res.push([a, b, c]); // 双指针都要移动
        while (nums[left] === nums[left + 1]) {
          left++; // 忽略重复的
        }
        left++;

        while (nums[right] === nums[right - 1]) {
          right--; // 忽略重复的
        }
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return res;
}
```

```
输入：[-1, 0, 1, 2, -1, -4]
输出：[[-1, 0, 1], [-1, -1, 2]]
```

# 26.删除排序数组中的重复项

```js
//O(n^2)
function removeDuplicates(arrs) {
  const list = [];
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i];
    if (!list.includes(arr)) list.push(arr);
  }
  return list;
}
```

```js
//O(n)
function removeDuplicates(arrs) {
  const list = new Set();
  for (let i = 0; i < arrs.length; i++) {
    const arr = arrs[i];
    list.add(arr);
  }
  return [...list];
}
```

```js
function removeDuplicates(arrs) {
  // 必须有序
  let l = arrs.length;
  let slow = 0;

  //i as fast
  for (let i = 0; i < l; i++) {
    if (arrs[i] != arrs[slow]) {
      slow++;
      arrs[slow] = arrs[i];
    }
  }

  return arrs.slice(0, slow + 1);
}
```

```text
示例 1:
输入: nums = [1,1,2]
输出: 长度 = 2, nums = [1,2]

示例 2:
输入: nums = [0,0,1,1,1,2,2,3,3,4]
输出: 长度 = 5, nums = [0,1,2,3,4]
```

# 37.解数独

# 46.全排列

```test
[1, 2, 3]
```

```js
const res = [];
function backtrack(arrs, list) {
  if (arrs.length == list.length) {
    res.push([...arrs]);
    return;
  }

  for (arr of list) {
    if (arrs.includes(arr)) continue;
    arrs.push(arr);
    backtrack(arrs, list);
    arrs.pop();
  }

  return res;
}

print(backtrack([], [1, 2, 3]));
```

# 51.n 皇后

```js
function solveNQueens(n) {
  // 回溯
  let res = [];
  const find = (row, tmp = []) => {
    if (row === n) {
      // 找完了 n-1就已经最后一行了 tmp就是所有的拜访位置
      res.push(
        tmp.map((c) => {
          let arr = new Array(n).fill(".");
          arr[c] = "Q";
          return arr.join("");
        })
      );
    }

    for (let col = 0; col < n; col++) {
      const cantSet = tmp.some((ci, ri) => {
        // 相同位置 或者 和对角线
        return ci === col || ri - ci === row - col || ri + ci === row + col;
      });
      if (cantSet) {
        continue;
      }
      // 如果能放，直接下一行
      find(row + 1, [...tmp, col]);
    }
  };

  find(0);
  return res;
}
```

# 71.简化路径

- 该问题的核心思想是使用栈（Stack）来处理路径的组成部分。在遍历路径时，我们将路径按照分隔符（"/"）拆分为各个部分，然后根据当前部分的内容进行判断处理。

```js
function simplifyPath(path) {
  let stack = [];
  let paths = path.split("/");

  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (p == "..") {
      stack.pop();
    } else if (p && p != ".") {
      stack.push(p);
    }
  }

  return "/" + stack.join("/");
}
```

```
Input: "/home/"
Output: "/home"

Input: "/a/./b/../../c/"
Output: "/c"

Input: "/../"
Output: "/"

Input: "/home//foo/"
Output: "/home/foo"
```

# 79.单词搜索

```
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

word = "ABCCED"
Output: true

word = "SEE"
Output: true

word = "ABCB"
Output: false

```

# 94.二叉树的中序遍历
