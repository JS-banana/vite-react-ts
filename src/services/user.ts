import request from '@/utils/request';

// 登录接口
export const login = (val: { username: string; password: string }) => {
  return request({
    method: 'POST',
    data: val,
  });
};
