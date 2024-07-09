import { instance } from './axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

interface Signin {
  email: string;
  password: string;
}

export const signin = async (data: Signin) => {
  try {
    const response = await instance.post('auth/login', data);
    if (response.data.accessToken && typeof document !== 'undefined') {
      Cookies.set('accessToken', response.data.accessToken);
      Cookies.set('refreshToken', response.data.refreshToken);
    }
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
