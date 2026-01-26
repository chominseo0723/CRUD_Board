import api from "../apis/api";

// 아이디 중복확인 API
export const CheckUsernameApi = async (username) => {
  try {
    const response = await api.post("auth/check-username", {
      username,
    });

    return response.data; 
  } catch (error) {
    console.error("아이디 중 복확인 에러:", error);
    throw error;
  }
};

export default CheckUsernameApi;