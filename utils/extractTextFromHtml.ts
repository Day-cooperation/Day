export const extractTextFromHtml = (content: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const textContent = tempDiv.textContent || '';
  return textContent;
};
