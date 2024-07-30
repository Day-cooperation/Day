import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
});

const getCachedSession = async () => {
  // 저장된 세션이 없거나 세션 만료시간 지나면 getSession 호출
  let session: any;
  const accessToken = localStorage.getItem('slid_accessToken');
  const expieryTime = Number(localStorage.getItem('slid_expieryTime'));
  if (accessToken && expieryTime) {
    if (new Date().getTime() > expieryTime) {
      session = await getSession();
      localStorage.setItem('slid_accessToken', session?.user.accessToken);
      localStorage.setItem('slid_expieryTime', session?.user.accessTokenExpieryTime);
      return session?.user.accessToken;
    }
  } else {
    session = await getSession();
    localStorage.setItem('slid_accessToken', session?.user.accessToken);
    localStorage.setItem('slid_expieryTime', session?.user.accessTokenExpieryTime);
    return session?.user.accessToken;
  }

  return accessToken;
};

axiosAuth.interceptors.request.use(
  async (config) => {
    const accessToken = await getCachedSession();
    if (accessToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
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
