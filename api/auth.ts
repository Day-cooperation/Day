import { instance } from './axios';
import Cookies from 'js-cookie';

interface Signin {
  email: string;
  password: string;
}

export const signin = async (data: Signin) => {
  const { data: response } = await instance.post('auth/login', data);
  if (response.accessToken && typeof document !== 'undefined') {
    Cookies.set('accessToken', response.accessToken);
    Cookies.set('refreshToken', response.refreshToken);
  }
  return response;
};

interface Signup {
  email: string;
  name: string;
  password: string;
}

export const signup = async (data: Signup) => {
  const { data: response } = await instance.post('user', data);
  if (response.accessToken && typeof document !== 'undefined') {
    Cookies.set('accessToken', response.accessToken);
    Cookies.set('refreshToken', response.refreshToken);
  }
  return response;
};
