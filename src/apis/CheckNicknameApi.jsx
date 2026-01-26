import api from "../apis/api";
// 닉네임 중복확인 API
export const CheckNicknameApi = async (nickname) => {
  try {
    const response = await api.post("auth/check-nickname", {
      nickname,
    });

    return response.data;
  } catch (error) {
    console.error("닉네임 중복확인 에러:", error);
    throw error;
  }
};

export default CheckNicknameApi;