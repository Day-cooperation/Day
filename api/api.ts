import { AxiosError } from 'axios';
import { instance } from './axios';

type BASIC_URL = 'goals' | 'notes' | 'todos' | string;
type GET_URL = BASIC_URL | 'todos/progress' | 'user';

interface GetRequest {
  url: GET_URL | string;
  params?: object;
}

// get 요청
export const getRequest = async ({ url, params }: GetRequest) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};

interface PostRequest {
  url: BASIC_URL;
  data: object;
}

// post 요청
export const postRequest = async ({ url, data }: PostRequest) => {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};

interface PatchRequest {
  url: BASIC_URL | string;
  params?: object;
  data: object;
}

// patch 요청
export const patchRequest = async ({ url, params, data }: PatchRequest) => {
  try {
    const response = await instance.patch(url, data, { params });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

interface DeleteRequest {
  url: BASIC_URL | string;
  params?: object;
}

// delete
export const deleteRequest = async ({ url, params }: DeleteRequest) => {
  try {
    const response = await instance.delete(url, { params });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
