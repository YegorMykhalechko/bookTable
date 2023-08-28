export const validateFields = (fields, requestBody) => {
  for (const field of fields) {
    if (!requestBody[field]) {
      return false;
    }
  }
  return true;
};
