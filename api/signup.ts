import { instance } from './axios';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

interface Signup {
  email: string;
  name: string;
  password: string;
}

export const signup = async (data: Signup) => {
  try {
    const response = await instance.post('auth/user', data);
    if (response.data.accessToken && typeof document !== 'undefined') {
      Cookies.set('accessToken', response.data.accessToken);
      Cookies.set('refreshToken', response.data.refreshToken);
    }
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
