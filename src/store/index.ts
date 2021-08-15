/* eslint-disable no-unused-vars */

// zustand 采用观察者模式，对组件进行订阅更新，
// 因此不需要在最外层提供一个类似redux的Provider包裹层
import create from 'zustand';

// 数据持久化，会缓存到 storage
// import { persist } from 'zustand/middleware';
// 模拟请求延迟
import { sleep } from './request';

// 模拟列表假数据
let dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// 类型声明
type StateProps = {
  /**@name 用户信息 */
  user: string;
  /**@name count */
  count: number;
  /**@name 数据列表 */
  list: any[];
  /**@name loading */
  loading: boolean;
  /**@name 当前修改项 */
  editItem: any;

  setUser: (val: string) => void;
  setLoading: (val: boolean) => void;
  getList: () => void;
  removeList: (id: string) => void;
  editList: (params: any) => void;
  addList: (params: any) => void;
  setEditItem: (params: any) => void;
  addAFish: () => void;
  reduceAFish: () => void;
};

// 创建 store
const useStore = create<StateProps>((set, get) => ({
  user: 'xiaoming',
  count: 0,
  list: [],
  loading: false,
  editItem: undefined,
  setUser: (val) => set({ user: val }),
  setLoading: (val) => set({ loading: val }),
  addAFish: () => set({ count: get().count + 1 }), // 同 set({ count: state.count + 1 })
  reduceAFish: () => set({ count: get().count - 1 }),
  setEditItem: (params: any) => set({ editItem: params }),
  // 获取列表
  getList: async () => {
    await sleep(1000);
    console.log(dataSource);
    set({ list: dataSource });
  },
  // 删除
  removeList: async (val) => {
    dataSource = dataSource.filter((n) => n.key !== val);
    get().getList();
  },
  // 修改
  editList: async (params: any) => {
    dataSource = dataSource.map((n) => {
      if (n.key === params.key) {
        return { ...n, ...params };
      }
      return n;
    });
    get().getList();
  },
  // 添加
  addList: async (params: any) => {
    dataSource = [{ ...params, key: `${dataSource.length + 1}` }, ...dataSource];
    get().getList();
  },
}));

// 暴露单一实例 useStore
export default useStore;
