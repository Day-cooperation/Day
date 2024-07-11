import { instance } from './axios';
import { AxiosError } from 'axios';

export const fileUpload = async (file: FormData) => {
  try {
    const response = await instance.post('files', file);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
