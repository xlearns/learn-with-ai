## 在小型独立窗口中打开页面

```js
function openMiniWindow(url, width = 500, height = 500) {
  let left = 400,
    top = 200;
  if (screen) {
    left = screen.width / 2 - width / 2;
    top = screen.height / 2 - height / 2;
  }
  window.open(
    url,
    undefined,
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
```

## 暗色模式-支持跟随系统与手动指定

### 明暗跟随系统的实现方式

- 跟随系统的明暗模式可以通过媒体查询 `prefers-color-scheme: {dark|light}` 去实现

```css
@media (prefers-color-scheme: dark) {
  color: #ffffff;
  background-color: #171717;
}
```

### 手动修改

- 使用 matchMedia 函数可以在 JS 脚本中进行媒体查询来获取当前的 prefers-color-schem 状态，并根据条件修改 body 的 class 加上 .theme-dark 类

```ts
// util/darkMode.ts
type ColorMode = "auto" | "light" | "dark";

const classDarkName = "theme-dark";
const cookieName = "color-mode";
const body = document.getElementsByTagName("body")[0] as HTMLBodyElement;

/** 检查夜间模式是否需要生效 */
export function checkDarkMode() {
  const mode = window.localStorage && window.localStorage.getItem(cookieName);
  // 自动模式
  if (!mode || mode === "auto") {
    if (
      typeof matchMedia === "function" &&
      matchMedia("(prefers-color-scheme: dark)").matches
    )
      body.classList.add(classDarkName);
    else body.classList.remove(classDarkName);
  }
  // 手动模式
  else {
    if (mode === "dark") body.classList.add(classDarkName);
    else body.classList.remove(classDarkName);
  }
}

/** 切换明暗主题 */
export function setColorMode(mode: ColorMode) {
  window.localStorage && window.localStorage.setItem(cookieName, mode);
  checkDarkMode();
}
```

## 超出文本显示省略号

### 禁止换行

```css
white-space: nowrap;
```

### 常规

- 修改 -webkit-line-clamp 数值来指定超过多少行进行换行。

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
overflow: hidden;
word-break: break-all;
```

### 避免折断英文单词

- 同时避免链接之类的无分割长英文溢出。

```css
display: -webkit-box;
white-space: pre-wrap;
overflow-wrap: break-word;
word-wrap: break-word;
-ms-word-break: break-all;
word-break: break-word;
overflow: hidden;
-webkit-line-clamp: 20;
-webkit-box-orient: vertical;
```
