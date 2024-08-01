import { axiosAuth } from './axios';

export const fileUpload = async (file: FormData) => {
  const response = await axiosAuth.post('files', file);
  return response;
};
