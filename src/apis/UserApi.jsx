import api from "../apis/api";

export const UserApi = async (accessToken) => {
  const response = await api.get('auth/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export default UserApi;