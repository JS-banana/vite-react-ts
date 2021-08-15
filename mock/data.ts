// 用户数据
const users = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    phone: '13600000000',
    desc: '超级管理员',
    roles: [1, 2, 3],
  },
  {
    id: 2,
    username: 'user-1',
    password: '123456',
    phone: '13600000000',
    desc: '普通管理员1',
    roles: [1, 2],
  },
  {
    id: 3,
    username: 'user-2',
    password: '123456',
    phone: '13600000000',
    desc: '超级管理员2',
    roles: [2, 3],
  },
];

// 菜单数据
const menus = [
  {
    id: 1,
    title: '首页',
    icon: 'icon-home',
    path: '/home',
    parent: null,
    desc: '首页',
    sorts: 0,
  },
  {
    id: 2,
    title: '系统管理',
    icon: 'icon-setting',
    url: '/system',
    parent: null,
    desc: '系统管理目录分支',
    sorts: 1,
  },
  {
    id: 3,
    title: '用户管理',
    icon: 'icon-user',
    url: '/system/useradmin',
    parent: 2,
    desc: '系统管理/用户管理',
    sorts: 0,
  },
  {
    id: 4,
    title: '角色管理',
    icon: 'icon-team',
    url: '/system/roleadmin',
    parent: 2,
    desc: '系统管理/角色管理',
    sorts: 1,
  },
  {
    id: 5,
    title: '权限管理',
    icon: 'icon-safetycertificate',
    url: '/system/poweradmin',
    parent: 2,
    desc: '系统管理/权限管理',
    sorts: 2,
  },
  {
    id: 6,
    title: '菜单管理',
    icon: 'icon-appstore',
    url: '/system/menuadmin',
    parent: 2,
    desc: '系统管理/菜单管理',
    sorts: 3,
  },
];

// 列表数据
const list = [
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

export default {
  users,
  menus,
  list,
};