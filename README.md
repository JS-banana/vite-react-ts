
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

## 🚀 项目地址

<https://github.com/JS-banana/vite2-react-ts-antd-eslint-Prettier>

## zustand 使用

> [官方文档](https://github.com/pmndrs/zustand)

### store创建与组件绑定

```js
// store
import create from 'zustand'

const useStore = create((set, get) => ({
  bears: 0,
  increasePopulation: () => set(state => ({ bears: state.bears + 1 })), // () => set({ bears: get().bears }) 也可以
  removeAllBears: () => set({ bears: 0 }),
  asyncSet: async () => {
    await sleep(1000);
    set({ bears: 11 });
  },
}))

// component
function Controls() {
  const bears = useStore(state => state.bears)
  const increasePopulation = useStore(state => state.increasePopulation)
  return (
    <div>
      <h1>{bears} around here ...</h1>
      <button onClick={increasePopulation}>one up</button>
    </div>
  );
}
```

### 组件外使用

```js
import useStore from './index';

// const { getState, setState, subscribe, destroy } = store

export const sleep = (timeout: number) => {
  // 1. 获取方法 执行逻辑
  const { setLoading } = useStore.getState();
  // 2. 直接通过 setState 修改状态
  // useStore.setState({ loading: false });

  return new Promise((resolve) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resolve(true);
    }, timeout);
  });
};
```
