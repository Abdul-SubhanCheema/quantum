import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/";

const LoginService = {
  login: async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}quantumronics-api/management/login`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  },
};

export default LoginService;
