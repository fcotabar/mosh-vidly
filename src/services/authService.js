import jwtDecode from 'jwt-decode';

import { apiUrl } from '../config.json';
import { http } from './httpService';

const apiEndpoint = `${apiUrl}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (err) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

const defaultOutput = { login, logout, getCurrentUser, loginWithJwt, getJwt };

export default defaultOutput;
