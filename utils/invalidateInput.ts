export const invalidateInput = (data: {} | null, inputValue: {} | null) => {
  if (!data) return;
  if (!inputValue) return;
  const temp = Object.values(data).map((item, index) => {
    if (item === Object.values(inputValue)[index]) {
      return false;
    }
    return true;
  });

  return temp.find((item) => item === true) || false;
};
