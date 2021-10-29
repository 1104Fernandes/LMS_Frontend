import axios from "axios";
import { LoginUser } from "../models/User";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/auth/";

class AuthService {
  async login(nickname: string, password: string): Promise<LoginUser> {
    const response = await axios.post(API_URL + "login", {
      nickname,
      password,
    });
    if (response.data.data.access_token) {
      response.data.status = response.status;
      localStorage.setItem("isLoggedIn", `${true}`);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  }

  async logout() {
    await axios.post(
      API_URL + "logout",
      {},
      {
        headers: authHeader(),
      }
    );
    localStorage.removeItem("user");
  }

  register(nickname: string, difficult_id: number, password: string) {
    return axios.post(API_URL + "register", {
      nickname,
      difficult_id,
      password,
    });
  }

  async getCurrentUser() {
    const response = await axios
      .post(
        API_URL + "me",
        {},
        {
          headers: authHeader(),
        }
      );

    console.log(response.data);
    return response.data;
  }
}

export default new AuthService();
