import axios from "axios";
import useAuth from "../Context/UseAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/";

const RefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}quantumronics-api/management/refresh-token`,
        {
          withCredentials: true,
        },
      );

      console.log("Refresh token response:", response.data.token);
      setAuth((prev) => {
        console.log("Previous auth state:", prev);
        return {
          ...prev,
          token: response.data.token,
        };
      });
      return response.data.token;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  return refresh;
};

export default RefreshToken;
