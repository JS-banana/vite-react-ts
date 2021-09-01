# Vite + React + Typescript + Antd

一个使用`vite2.x`搭建的`react17.x`项目，支持`TypeScript4.x`、`Antd4.x`，以及`eslint`/`prettier`/`stylelint`/`commitlint`等工程化管理~

## 开发

- **使用 Gitpod 体验在线开发环境**

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/JS-banana/vite-react-ts/)

- **克隆到本地**

```sh
# clone
git clone https://github.com/JS-banana/vite-react-ts.git

# install
yarn install

# dev serve
yarn dev
```

## 特性

- 支持`Typescript`
- 支持`React`、`JSX`语法
- 支持`ES6`语法
- 支持`Less module`
- 支持`Eslint`、`Prettier`、`Pre-commit hook`
- 支持`HMR`快速热更新
- 支持`Antd`按需引入与主题样式覆盖
- 支持`Proxy`代理、`alias`别名
- 兼容传统浏览器
- 开发启动速度要够快，以秒计算
- 支持懒加载和`chunk`分割

## 目录结构

```js
├── dist                                // 默认的 build 输出目录
├── config                              // 全局配置文件
└── src                                 // 源码目录
    ├── assets                          // 公共的文件（如image、css、font等）
    ├── components                      // 项目组件
    ├── constants                       // 常量/接口地址等
    ├── layout                          // 全局布局
    ├── routes                          // 路由
    ├── store                           // 状态管理器
    ├── utils                           // 工具库
    ├── pages                           // 页面模块
        ├── Home                        // Home模块，建议组件统一大写开头
        ├── ...
    ├── App.tsx                         // react顶层文件
    ├── main.ts                         // 项目入口文件
    ├── typing.d.ts                     // ts类型文件
├── .editorconfig                       // IDE格式规范
├── .env                                // 环境变量
├── .eslintignore                       // eslint忽略
├── .eslintrc                           // eslint配置文件
├── .gitignore                          // git忽略
├── .npmrc                              // npm配置文件
├── .prettierignore                     // prettierc忽略
├── .prettierrc                         // prettierc配置文件
├── .stylelintignore                    // stylelint忽略
├── .stylelintrc                        // stylelint配置文件
├── index.html                          // 项目入口文件
├── LICENSE.md                          // LICENSE
├── package.json                        // package
├── pnpm-lock.yaml                      // pnpm-lock
├── postcss.config.js                   // postcss
├── README.md                           // README
├── tsconfig.json                       // typescript配置文件
└── vite.config.ts                      // vite
```

## 版本

- v0.0.1：2021-07-23更新
- v0.0.2：2021-08-12更新
  - `.stylelint`配置调整，`pre-commit`调整为`.husky`及其他细节优化
- v0.0.3：2021-08-15 至 2021-09-01
  - 解决antd按需加载在开发环境下的自定义样式被覆盖问题
  - 重构路由及layout模块，优化路由页面
  - 增加mock请求数据，整理目录结构
  - 分离vite plugin及其配置、环境变量，优化写法并全局统一管理
  - 使用 react-route-config 统一管理路由
  - 调整部分样式
