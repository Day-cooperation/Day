import { instance } from './axios';
import Cookies from 'js-cookie';

interface Signin {
  email: string;
  password: string;
}

export const signin = async (data: Signin) => {
  const response = await instance.post('auth/login', data);
  if (response.data.accessToken && typeof document !== 'undefined') {
    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);
  }
  return response;
};

interface Signup {
  email: string;
  name: string;
  password: string;
}

export const signup = async (data: Signup) => {
  const response = await instance.post('user', data);
  if (response.data.accessToken && typeof document !== 'undefined') {
    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);
  }
  return response;
};
