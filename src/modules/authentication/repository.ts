import CONFIG from "@config/index";
import { decode } from "jsonwebtoken";
import httpRepository from "@modules/core/repository/http";
import User from "@modules/user/entity";

const register = async (payload) => {
  return await httpRepository.execute({
    path: "/auth/register",
    method: "post",
    payload,
    config: { isPrivate: false },
  });
};

const login = async (payload) => {
  return await httpRepository.execute({
    path: "/api/Users/login",
    method: "post",
    payload,
    config: { isPrivate: false },
  });
};

const setToken = (token) => {
  if (typeof token == "string") {
    localStorage.setItem(CONFIG.TOKEN_FEILD, token);
  }
};

const getToken = () => {
  const token: string = localStorage.getItem(CONFIG.TOKEN_FEILD);
  return token;
};

const removeToken = () => {
  localStorage.removeItem(CONFIG.TOKEN_FEILD);
};

const getInfoFromToken = () => {
  const token = "";
  const userInfo: User = new User(decode(token));
  return userInfo;
};

export default {
  register,
  login,
  setToken,
  getToken,
  removeToken,
  getInfoFromToken,
};
