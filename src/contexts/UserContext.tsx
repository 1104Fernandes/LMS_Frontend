import axios from "axios";
import React, { useState } from "react";
import { LoginOptions, LoginUser, CreateUserData } from "../models/User";
const API_URL = "http://localhost:4000/auth/";

type UserContext = {
  user: LoginUser | null;
  actions: {
    register: (registerOptions: CreateUserData) => any;
    login: (loginOptions: LoginOptions) => any;
    logout: () => void;
    getToken: () => string | null;
    authHeader: () => string | null;
  };
};

export const initialContext = {
  user: null,
  actions: {
    register: (registerOptions: CreateUserData) => {},
    login: (loginOptions: LoginOptions) => {},
    logout: () => {},
    authHeader: () => {
      return null;
    },
    getToken: () => {
      return null;
    },
  },
};

export const userContext = React.createContext<UserContext>(initialContext);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [userToken, setUserToken] = useState(null);

  const register = async ({
    nickname,
    password,  
    e_mail,
    age,
    gender_id,
    profession_id,
    job_id    
  }: CreateUserData) => {
    try {
      const res = await axios.post(API_URL + "register", {
        nickname,
        password,
        e_mail, 
        age,
        gender_id,
        profession_id,
        job_id
      });
      console.log(res)
      if (res.status === 200) {
        return res;
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  };


  const login = async ({ nickname, password }: LoginOptions) => {
    try {    
      const res = await axios.post(API_URL + "login", {
        nickname,
        password,
      });
      if (res.status === 200) {
        const token = res.data?.data?.access_token;
        setUser(res.data.data);
        setUserToken(token);
        window.localStorage.setItem("access_token", token);
        return res;
      }
      return null; // status fälle muss abgeändert werden
    } catch (e) {
      console.error(e);
    }
  };

  function logout() {
    localStorage.removeItem("access_token");
    setUserToken(null);
    setUser(null);
  }

  function getToken() {
    return userToken;
  }

  function authHeader() {
    const access_token = getToken();

    if (access_token) {
      return "Bearer " + access_token;
    } else {
      return null;
    }
  }

  return (
    <userContext.Provider
      value={{
        user: user,
        actions: { login, getToken, logout, register, authHeader },
      }}
    >
      {children}
    </userContext.Provider>
  );
};
