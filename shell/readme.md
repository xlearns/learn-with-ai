# 总结

## TypeScript 写 shell 脚本

- 首先在全局安装 tsx

```
npm i -g tsx
```

- 在文件头部添加这行注释：#!/usr/bin/env tsx

```
#!/usr/bin/env tsx

console.log('hello world')
```

- 添加权限

  - `chmod +x ./myScript.ts`

- 使用
  > ./myScript.ts

## JavaScript 写 shell 脚本

- 在文件头部添加这行注释：#!/usr/bin/env node

```
#!/usr/bin/env node

console.log('hello world')
```

- 添加权限

  - `chmod +x ./myScript.ts`

- 使用
  > ./myScript.js
