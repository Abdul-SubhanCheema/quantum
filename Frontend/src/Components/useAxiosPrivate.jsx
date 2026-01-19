import axios from "axios";
import RefreshToken from "../Context/UseRefresh";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001/";
import { useEffect } from "react";
import useAuth from "../Context/UseAuth";

const axiosprivate = axios.create({
  baseURL: `${API_BASE_URL}quantumronics-api/`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = RefreshToken();

  useEffect(() => {
    const requestIntercept = axiosprivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosprivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosprivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosprivate.interceptors.request.eject(requestIntercept);
      axiosprivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosprivate;
};

export default useAxiosPrivate;
