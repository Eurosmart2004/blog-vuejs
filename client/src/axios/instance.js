import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_APP_BASE_URL_PROD
    : import.meta.env.VITE_APP_BASE_URL_DEV;
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

async function refreshToken(getUser = false) {
  try {
    const response = await instance.get(`/token/refreshToken`);
    const accessToken = response.data.accessToken;
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    if (getUser) {
      let user = jwtDecode(accessToken);
      try {
        const response_user = await instance.get(`/user/getUser/${user._id}`);
        return response_user.data.user;
      } catch (err) {
        console.log(err);
      }
    } else {
      return accessToken;
    }
  } catch (err) {
    throw err;
  }
}

instance.interceptors.request.use(async (req) => {
  if (
    localStorage.getItem("isLoggedIn") === null ||
    localStorage.getItem("isLoggedIn") === undefined ||
    localStorage.getItem("isLoggedIn") === "false"
  ) {
    return req;
  }

  if (req.url === "/token/refreshToken") {
    return req;
  }

  let accessToken =
    instance.defaults.headers.common?.Authorization?.split(" ")[1];

  if (accessToken) {
    const user = jwtDecode(accessToken);
    const current_time = Date.now().valueOf() / 1000;
    const isExpired = user.exp < current_time;
    if (isExpired) {
      try {
        accessToken = await refreshToken();
      } catch (err) {
        console.log(err);
        // Handle error
        return req;
      }
    }
  } else {
    // If not have access token use refresh token to get new access token
    try {
      accessToken = await refreshToken();
    } catch (err) {
      console.log(err);
      // Handle error
      return req;
    }
  }
  req.headers["Authorization"] = `Bearer ${accessToken}`;
  return req;
});

export default instance;
export { refreshToken };
