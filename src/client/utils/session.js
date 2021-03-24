import Cookies from 'universal-cookie';

const cookies = new Cookies();

const COOKIE_TOKEN = 'token';

export const setCookieToken = (value, req) => {
  if (req) {
    req.cookies[COOKIE_TOKEN] = value;
  } else {
    cookies.set(COOKIE_TOKEN, value, { path: '/' });
  }
};

export const getCookieToken = (req = null) => {
  if (req) {
    return req.cookies[COOKIE_TOKEN];
  }
  return cookies.get(COOKIE_TOKEN, { path: '/' });
};

export const deleteCookieToken = (req) => {
  if (req) {
    req.cookies[COOKIE_TOKEN] = null;
    return;
  }

  cookies.remove(COOKIE_TOKEN, { path: '/' });
};
