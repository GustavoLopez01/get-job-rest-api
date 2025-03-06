
export const generateUniqueKey = () => {
  const value = Date.now();
  const randomStr = (Math.random() + 1).toString(36).substring(2);
  return `${randomStr}-${value}`
}