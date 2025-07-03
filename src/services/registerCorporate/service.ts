import { securityApi } from "../../api/securityApi";

export const registerCorporate = async (formData: any) => {
    try {
      const response = await securityApi.post(`/users/create-corporate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error) {
      const { response } = error;
      return response;
    }
  };