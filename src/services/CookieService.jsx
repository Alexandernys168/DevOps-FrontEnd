import Cookies from 'js-cookie';

export const setUserInfoCookie = (username, role) => {
  const userInfo = { username, role };
  Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 7 });
};

export const getUsernameFromCookie = () => {
  const storedUserInfo = Cookies.get('userInfo');
  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    return userInfo.username;
  }
  return null;
};

export const getRoleFromCookie = () => {
  const storedUserInfo = Cookies.get('userInfo');
  if (storedUserInfo) {
    const userInfo = JSON.parse(storedUserInfo);
    return userInfo.role;
  }
  return null;
};