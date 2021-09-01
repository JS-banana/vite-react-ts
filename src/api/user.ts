/* eslint-disable no-unused-vars */
import request from '@/utils/request';

enum Api {
  USER_Login = '/api/login',
  USER_INFP = '/api/user',
}

interface ResProps {
  code: 0 | -1;
  data: any;
}

export const login = (data: { username: string; password: string }): Promise<ResProps> =>
  request({ url: Api.USER_Login, method: 'POST', data });

export const getUserInfo = () => request({ url: Api.USER_INFP, method: 'GET' });
