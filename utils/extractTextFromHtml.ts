export const extractTextFromHtml = (content: any) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  const textContent = tempDiv.textContent || '';
  return textContent;
};
