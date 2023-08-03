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

function removeDuplicates(arrs) {
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

print(removeDuplicates([4, 4, 0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
