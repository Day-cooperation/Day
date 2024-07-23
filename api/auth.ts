import { instance } from './axios';

interface Signin {
  email: string;
  password: string;
}

export const signin = async (data: Signin) => {
  const { data: response } = await instance.post('auth/login', data);
  return response;
};

interface Signup {
  email: string;
  name: string;
  password: string;
}

export const signup = async (data: Signup) => {
  const { data: response } = await instance.post('user', data);
  return response;
};
