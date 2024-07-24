import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const session = await getSession();

    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const res = await instance.post('/auth/tokens', undefined, {
        headers: { Authorization: session?.user.refreshToken },
      });
      if (session) session.user.accessToken = res.data.accessToken;
      else signOut();
    }
    return Promise.reject(error);
  }
);
