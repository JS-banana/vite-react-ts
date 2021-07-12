
# Vite2 + React + Typescript + Antd + Eslint + Prettier

## ✨ Feature

- alias import
- build tools from [vite2](https://github.com/vitejs/vite)
- antd Design Config embedded
- eslint 代码格式规范验证
- prettierrc 格式化配置
- pre-commit 代码提交前执行Eslint验证
- zustand 状态管理器
- 支持Less module（任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件）

## 环境

通过 `--mode` 注入配置参数以匹配测试/开发环境等。

package.json

```json
scripts: {
  "build:beta": "vite build --mode beta",
  "build:release": "vite build --mode release",
}
```

node环境下获取环境变量：`const env = process.argv[process.argv.length - 1]`

```js
// vite.config.ts
const env = process.argv[process.argv.length - 1];
console.log('env：', env);
```

运行时获取 环境变量：`import.meta.env`

```jsx
import React from 'react'
import { Button } from 'antd'

export default function Index() {
  console.log('import.meta.env', import.meta.env)
  return <div>
    <Button type='primary'>Index</Button>
  </div>
}
```
