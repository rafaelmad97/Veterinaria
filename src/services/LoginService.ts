import axios from "axios";

const apiRoute = import.meta.env.VITE_API_ROUTE;

const LOGIN_URL = "/users/login";

class LoginService {
  async Login(username: string, password: string) {
    return await axios
      .post(`${apiRoute}${LOGIN_URL}`, {
        data: {
          username,
          password,
        },
      })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        return data;
      });
  }
}

export default LoginService;
