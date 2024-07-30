import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

let cachedSession: any = null;

const getCachedSession = async () => {
  // 저장된 세션이 없거나 세션 만료시간 지나면 getSession 호출
  if (cachedSession) {
    if (new Date().getTime() > (cachedSession.user.accessTokenExpieryTime as number))
      cachedSession = await getSession();
  } else {
    cachedSession = await getSession();
  }
  return cachedSession;
};

axiosAuth.interceptors.request.use(
  async (config) => {
    const session = await getCachedSession();
    if (session && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${session?.user?.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    // refreshToken 유효하지 않으면 signOut()
    signOut();
    return Promise.reject(error);
  }
);
