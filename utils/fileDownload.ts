import { Todo } from '@/types/Todo';

export const fileDownload = (selecteItem: Todo) => {
  const fileUrl = selecteItem.fileUrl as string;
  const aElement = document.createElement('a');
  aElement.setAttribute('href', fileUrl);
  aElement.setAttribute('download', fileUrl);
  document.body.append(aElement);
  aElement.click();
  aElement.remove();
};
