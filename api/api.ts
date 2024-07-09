import { AxiosError } from 'axios';
import { instance } from './axios';

type BASIC_URL = 'goals' | 'notes' | 'todos';
type GET_URL = BASIC_URL | 'todos/progress' | 'user';

interface GetRequest {
  url: GET_URL;
  params?: number;
}

// get 요청
export const getRequest = async ({ url, params }: GetRequest) => {
  try {
    const response = await instance.get(url, { params });
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};

interface PostRequest {
  url: BASIC_URL;
  data: Object;
}

// post 요청
export const postRequest = async ({ url, data }: PostRequest) => {
  try {
    const response = await instance.post(url, data);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};

interface PatchRequest {
  url: BASIC_URL;
  params?: number;
  data: Object;
}

// patch 요청
export const patchRequest = async ({ url, params, data }: PatchRequest) => {
  try {
    const response = await instance.patch(url, data, { params });
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};

interface DeleteRequest {
  url: BASIC_URL;
  params: number;
}

// delete
export const deleteRequest = async ({ url, params }: DeleteRequest) => {
  try {
    const response = await instance.delete(url, { params });
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
