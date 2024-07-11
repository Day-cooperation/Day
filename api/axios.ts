import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://sp-slidtodo-api.vercel.app/1-1';
const isServer = typeof window === 'undefined';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// 요청 인터셉터
instance.interceptors.request.use(
  async (config) => {
    let accessToken;
    if (isServer) {
      const { cookies } = await import('next/headers');
      accessToken = cookies().get(ACCESS_TOKEN)?.value;
    } else {
      accessToken = Cookies.get(ACCESS_TOKEN);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 이미 재시도한 요청인지 확인
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // 재시도 플래그 설정
    originalRequest._retry = true;

    const refreshToken = Cookies.get(REFRESH_TOKEN);

    console.log('error.response?.message: ', error.response);

    // 액세스 토큰 만료 시
    if (refreshToken && error.response?.status === 401) {
      try {
        // 리프레시 토큰을 사용하여 새로운 토큰을 요청
        const response = await instance.post(`auth/tokens`, undefined, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        // 새로운 토큰이 반환되면 쿠키에 저장
        if (response.status === 201 && response.data.accessToken) {
          const { accessToken, refreshToken: newRefreshToken } = response.data;

          Cookies.set(ACCESS_TOKEN, accessToken);
          Cookies.set(REFRESH_TOKEN, newRefreshToken);

          // 원래 요청에 새 토큰 설정 후 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalRequest);
        }
      } catch (tokenRefreshError) {
        // 리프레시 토큰이 유효하지 않으면 에러 반환
        if ((tokenRefreshError as AxiosError).response?.status === 401) {
          return Promise.reject(tokenRefreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);