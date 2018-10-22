export const shorten = (str, length) => 
  str.length > length ? str.substring(0, length) + '...' : str;