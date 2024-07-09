import { instance } from './axios';
import { AxiosError } from 'axios';

interface FileUpload {
  file: File;
}

export const fileUpload = async (file: FileUpload) => {
  try {
    const response = await instance.post('files', file);
    return response;
  } catch (e) {
    if (e instanceof AxiosError) console.error(e.message);
  }
};
