# zustand 状态管理器

> [官方文档](https://github.com/pmndrs/zustand)

## 特性

1. 不需要像redux那样在最外层包裹一层高阶组件，只绑定对应关联组件即可（当在其他组件/方法修改状态后，该组件会自动更新）
2. 异步处理也较为简单，与普通函数用法相同
3. 支持hook组件使用、组件外使用
4. 提供middleware拓展能力（redux、devtools、combine、persist）

- 通过 <https://github.com/mweststrate/immer> 拓展能力（实现嵌套更新、日志打印）

窥探源码可知实现原理为：

- 发布订阅结合闭包通过hook实现更新

```js
// vanilla.ts

// create方法
function create(createState){
  // 1. state
  let state
  // 监听器
  const listeners = new Set()
  // 2. setState 方法
  const setState = (partial, replace) => {
    // 数据比较逻辑
    ...
    // 数据合并 
    state = replace ? nextState : Object.assign({}, state, nextState)
    // 通知
    listeners.forEach((listener) => listener(state, previousState))
  }

  // 3. getState
  const getState = () => state

  // subscribeWithSelector
  // const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
  //   let currentSlice = selector(state)
  //   function listenerToAdd() {
  //     const nextSlice = selector(state)
  //     if (!equalityFn(currentSlice, nextSlice)) {
  //       const previousSlice = currentSlice
  //       listener((currentSlice = nextSlice), previousSlice)
  //     }
  //   }
  //   listeners.add(listenerToAdd)
  //   // Unsubscribe
  //   return () => listeners.delete(listenerToAdd)
  // }

  // 4. subscribe
  const subscribe = (listener, selector, equalityFn) => {
    // 条件处理
    // if (selector || equalityFn) {
    //   return subscribeWithSelector(listener, selector, equalityFn)
    // }
    // add
    listeners.add(listener)
    // Unsubscribe
    return () => listeners.delete(listener)
  }

  // 5. destroy
  const destroy = () => listeners.clear()

  // 暴露接口
  const api = { setState, getState, subscribe, destroy }
  state = createState(setState, getState, api)
  return api
}
```

```js
// index.ts
import createImpl from './vanilla'

// create
function create(createState){
  // 获取 store 实例
  const api = createState === 'function' ? createImpl(createState) : createState

  // useStore
  const useStore = (selector = api.getState, equalityFn = Object.is) => {
    // 组件更新： useReducer
    const [, forceUpdate] = useReducer((c) => c + 1, 0)

    // 数据保存及更新条件处理
    ...
  }

  Object.assign(useStore, api)

  return useStore
}
```

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

## 第三方状态管理库

### Redux

- 核心原理：reducer 纯函数
- 使用Context API
- 遵循的是函数式（如函数式编程）的风格
- 单一的全局存储来保存应用程序的所有状态
- 更改只通过动作发生
- bundle size小（redux+react-redux约为3kb）

```js
function reducer(state = { name: null }, action) {
  switch(action.type) {
    case 'CHANGE_NAME':
      return { ...state, name: action.data }
  }
}

const store = createStore(reducer)

<Provider store={store}>
  ...
</Provider>
```

### MobX

- 核心原理：ES6 proxy
- MobX是基于观察者/可观察模式的。
- 以真正的 "反应式 "方式管理状态，因此当你修改一个值时，任何使用该值的组件都会自动重新渲染。
- 不需要任何动作或者reducers，只需修改你的状态，应用程序就会反映出来。
- 要求使用ES6代理，意味着不支持IE11及以下版本。（或者旧版本）

```js
class Store {
  @observable
  name = null

  @action.bound
  setName(name) {
    this.name = name
  }
}

const store = new Store()

<Provider store={store}>
  ...
</Provider>
```

### Recoil

- 与 React 非常相似的简单 API，它的API像React的useState和Context API的组合
- 通过跟踪对useRecoilState的调用，Recoil可以跟踪哪些组件使用了哪些原子。这样它就可以在数据发生变化时，只重新渲染那些 "订阅 "某项数据的组件，所以这种方法在性能方面应该可以很好地扩展。
- 与Redux一样需要在最外层提供类似Context Provider包裹的方式
- 该库较新，存在未知的错误

### Constate

- 基于hook

```js
function defineStore() {
  const [state, setState] = useState({ name: null })
  const setName = name => setState(state => {
    return { ...state, name }
  })
  return { state, setName }
}

const [Provider, useStore] = constate(defineStore)

<Provider>
  ...
</Provider>
```

### Concent

- 文档： <https://concentjs.github.io/concent-doc/>
- Github：<https://github.com/concentjs/concent>

```js
// api
const storeConf = {
  store: {},
  reducer: {},
  ghost: {},
  watch: {},
  computed: {},
  lifecycle: {},
};
```

```js
// 创建store子模块
import { run } from 'concent';

run({ 
  counter: {
    state: {
      name:'concent',
      firstName:'',
      lastName:'',
      age:0,
      hobbies:[]
    }
  }
});

// 注册成为Concent Class组件，指定其属于 counter 模块
import React, { Component } from 'react';
import { register } from 'concent';

@register('counter')
class HelloConcent extends Component {
  state = { name: 'this value will been overwrite by counter module state' }
  render() {
    const { name, age, hobbies } = this.state;
    return (
      <div>
        name: {name}
        age: {age}
        hobbies: {hobbies.map((v, idx) => <span key={idx}>{v}</span>)}
      </div>
    );
  }
}

// 函数式组件
import { useConcent } from 'concent';

function CounterFnComp() {
  const { state, setState } = useConcent('counter');
  return (
    <div>
      count: {state.count}
      <button onClick={() => setState({count: state.count+1})}>inc</button>
      <button onClick={() => setState({count: state.count-1})}>dec</button>
    </div>
  );
}
```

### Dva

Redux包装

## 参考资料

> <https://toutiao.io/posts/8odmmkg/preview>
>
> <https://www.tangshuang.net/7862.html>
