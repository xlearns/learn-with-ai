# 总结

## 两数之和

## 三数之和

## 删除排序数组中的重复项

## 最长递增子序列

## 最长公共子序列【LCS】

- 当 i=0 或 j=0 时：dp[i, j] = 0
- 当 i、j>0 且 ai=bj：dp[i, j] = dp[i-1, j-1] + 1
- 当 i、j>0 且 ai!=bj：dp[i, j] = max(dp[i-1, j], dp[i, j-1])

```js
function longestCommonSubsequence(str1, str2) {
  function lcsHelper(i, j) {
    if (i === 0 || j === 0) {
      return 0;
    } else if (str1[i - 1] === str2[j - 1]) {
      return 1 + lcsHelper(i - 1, j - 1);
    } else {
      return Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));
    }
  }

  return lcsHelper(str1.length, str2.length);
}

const str1 = "ABCD";
const str2 = "ACDF";
const result = longestCommonSubsequence(str1, str2);
console.log(result);
```

```js
function longestCommonSubsequence(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let lcs = "";
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      lcs = str1[i - 1] + lcs;
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }

  return lcs;
}

const str1 = "ABCDGH";
const str2 = "AEDFHR";
const lcs = longestCommonSubsequence(str1, str2);
console.log(lcs);
```

## 最长公共子数组
