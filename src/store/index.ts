/* eslint-disable no-unused-vars */
import create from 'zustand';

// import { persist } from 'zustand/middleware';
import { sleep } from './request';

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

type State = {
  user: string;
  count: number;
  list: any[];
  loading: boolean;
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

const useStore = create<State>((set, get) => ({
  user: 'xiaoming',
  count: 0,
  list: [],
  loading: false,
  editItem: undefined,
  setUser: (val) => set({ user: val }),
  setLoading: (val) => set({ loading: val }),
  addAFish: () => set({ count: get().count + 1 }),
  reduceAFish: () => set({ count: get().count - 1 }),
  setEditItem: (params: any) => set({ editItem: params }),
  getList: async () => {
    await sleep(1000);
    console.log(dataSource);
    set({ list: dataSource });
  },
  removeList: async (val) => {
    dataSource = dataSource.filter((n) => n.key !== val);
    get().getList();
  },
  editList: async (params: any) => {
    dataSource = dataSource.map((n) => {
      if (n.key === params.key) {
        return { ...n, ...params };
      }
      return n;
    });
    get().getList();
  },
  addList: async (params: any) => {
    dataSource = [{ ...params, key: `${dataSource.length + 1}` }, ...dataSource];
    get().getList();
  },
}));
export default useStore;
