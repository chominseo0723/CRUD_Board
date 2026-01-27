import api from "../apis/api";

// 로그인 API
const LoginApi = async ({ username, password }) => {
  try {
    const response = await api.post("auth/login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("로그인 에러:", error);
    throw error;
  }
};

export default LoginApi;
