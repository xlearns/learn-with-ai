function print(s) {
  console.log(s);
}
// function threeSum(nums) {
//   const l = nums.length;
//   const res = [];
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < l - 2; i++) {
//     if (i > 0 && nums[i] === nums[i - 1]) continue; // 去除重复的 i
//     for (let j = i + 1; j < l - 1; j++) {
//       if (j > i + 1 && nums[j] === nums[j - 1]) continue; // 去除重复的 j
//       for (let k = j + 1; k < l; k++) {
//         if (k > j + 1 && nums[k] === nums[k - 1]) continue; // 去除重复的 k
//         const a = nums[i];
//         const b = nums[j];
//         const c = nums[k];
//         if (a + b + c == 0) {
//           res.push([a, b, c]);
//         }
//       }
//     }
//   }
//   return res;
// }

// function threeSum(nums) {
//   const l = nums.length;
//   const res = [];
//   if (nums.length < 3) return [];
//   nums.sort((a, b) => a - b);
//   for (let i = 0; i < l; i++) {
//     if (nums[i] === nums[i - 1]) continue;
//     const a = nums[i];
//     let left = i + 1;
//     let right = l - 1;
//     while (left < right) {
//       const b = nums[left];
//       const c = nums[right];
//       const sum = a + b + c;
//       if (right === i) {
//         right--;
//       } else if (sum === 0) {
//         res.push([a, b, c]); // 双指针都要移动
//         while (nums[left] === nums[left + 1]) {
//           left++; // 忽略重复的
//         }
//         left++;

//         while (nums[right] === nums[right - 1]) {
//           right--; // 忽略重复的
//         }
//         right--;
//       } else if (sum > 0) {
//         right--;
//       } else {
//         left++;
//       }
//     }
//   }
//   return res;
// }
// print(threeSum([-1, 0, 1, 2, -1, -4]));

// function removeDuplicates(arrs) {
//   let l = arrs.length;
//   let slow = 0;

//   //i as fast
//   for (let i = 0; i < l; i++) {
//     if (arrs[i] != arrs[slow]) {
//       slow++;
//       arrs[slow] = arrs[i];
//     }
//   }

//   return arrs.slice(0, slow + 1);
// }

// print(removeDuplicates([4, 4, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

// function permute(list) {
//   const result = [];

//   const backtrack = (arrs) => {
//     if (arrs.length === list.length) {
//       result.push([...arrs]);
//       return;
//     }

//     for (arr of list) {
//       arrs.push(arr);
//       backtrack(arrs);
//       arrs.pop();
//     }
//   };
//   backtrack([]);

//   return result;
// }

// print(permute([1, 2, 3]));

// const res = [];
// function backtrack(arrs, list) {
//   if (arrs.length == list.length) {
//     res.push([...arrs]);
//     return;
//   }

//   for (arr of list) {
//     if (arrs.includes(arr)) continue;
//     arrs.push(arr);
//     backtrack(arrs, list);
//     arrs.pop();
//   }

//   return res;
// }

// print(backtrack([], [1, 2, 3]));

// function solveNQueens(n) {
//   // 回溯
//   let res = [];
//   const find = (row, tmp = []) => {
//     if (row === n) {
//       // 找完了 n-1就已经最后一行了 tmp就是所有的拜访位置
//       res.push(
//         tmp.map((c) => {
//           let arr = new Array(n).fill(".");
//           arr[c] = "Q";
//           return arr.join("");
//         })
//       );
//     }

//     for (let col = 0; col < n; col++) {
//       const cantSet = tmp.some((ci, ri) => {
//         // 相同位置 或者 和对角线
//         return ci === col || ri - ci === row - col || ri + ci === row + col;
//       });
//       if (cantSet) {
//         continue;
//       }
//       // 如果能放，直接下一行
//       find(row + 1, [...tmp, col]);
//     }
//   };

//   find(0);
//   return res;
// }

// function solveNQueens(n) {
//   const board = new Array(n).fill(0).map(() => new Array(n).fill("."));
//   const result = [];

//   const isValid = (row, col) => {
//     // Check column
//     for (let i = 0; i < row; i++) {
//       if (board[i][col] === "Q") {
//         return false;
//       }
//     }
//     // Check main diagonal (top-left to bottom-right)
//     for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
//       if (board[i][j] === "Q") {
//         return false;
//       }
//     }
//     // Check anti-diagonal (top-right to bottom-left)
//     for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
//       if (board[i][j] === "Q") {
//         return false;
//       }
//     }
//     return true;
//   };
//   const backtrack = (row) => {
//     if (row === n) {
//       //遍历完成
//       const solution = board.map((row) => row.join(""));
//       result.push(solution);
//       return;
//     }

//     for (let col = 0; col < n; col++) {
//       if (isValid(row, col)) {
//         board[row][col] = "Q";
//         backtrack(row + 1);
//         board[row][col] = ".";
//       }
//     }
//   };

//   backtrack(0);

//   return result;
// }
// print(solveNQueens(4));

// function simplifyPath(path) {
//   let stack = [];
//   let paths = path.split("/");

//   for (let i = 0; i < paths.length; i++) {
//     const p = paths[i];
//     if (p == "..") {
//       stack.pop();
//     } else if (p && p != ".") {
//       stack.push(p);
//     }
//   }

//   return "/" + stack.join("/");
// }

// print(simplifyPath("/a/./b/../../c/"));
// print(simplifyPath("/home/"));
// print(simplifyPath("/home//foo/"));

//
// function fib(n) {
//   // 第 n 个数字等于第 n-1 和第 n-2 个数字的和。
//   if (n == 0) return 0;
//   else if (n == 1) return 1;
//   else return fib(n - 1) + fib(n - 2);
// }

// print(fib(4));

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 构建二叉树
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

// function inorderTraversal(root) {
//   if (!root) {
//     return [];
//   }

//   const result = [];

//   function inorder(node) {
//     if (!node) {
//       return;
//     }
//     inorder(node.left);
//     result.push(node.val);
//     inorder(node.right);
//   }

//   inorder(root);

//   return result;
// }

// 迭代
// function inorderTraversal(root) {
//   if (!root) [];
//   const result = [];
//   const stack = [];
//   let node = root;
//   while (node || stack.length > 0) {
//     while (node) {
//       stack.push(node);
//       node = node.left;
//     }
//     node = stack.pop();
//     result.push(node.val);
//     node = node.right;
//   }

//   return result;
// }

// print(inorderTraversal(root));

async function concurrentRequest(urls, maxConcurrent, callback) {
  const results = [];
  const queue = []; // 队列用于存放待执行的请求
  let currentCount = 0;

  async function request(url, idx) {
    currentCount++;
    console.log(`Sending request to ${url} (Concurrent: ${currentCount})`);
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = `Response from ${url}`;
        currentCount--;
        results[idx] = result; // 将结果存储在正确的索引位置
        resolve(result);
      }, 5000);
    });
    return result;
  }

  async function run() {
    while (queue.length > 0) {
      const { url, idx } = queue.shift(); // 从队列中取出一个请求
      await request(url, idx); // 等待请求完成
      if (queue.length === 0) {
        callback(results);
      }
    }
  }

  urls.forEach((url, idx) => {
    queue.push({ url, idx }); // 将请求加入队列
  });

  // 同时执行不超过 maxConcurrent 个任务
  for (let i = 0; i < maxConcurrent; i++) {
    run();
  }
}

// 示例数据
const urls = ["url1", "url2", "url3", "url4", "url5"];
concurrentRequest(urls, 2, (results) => {
  console.log("All requests completed:");
  console.log(results);
});
