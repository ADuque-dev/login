import axios from "axios";

const url: string = import.meta.env.VITE_API_URL!;

const securityApi = axios.create({
  baseURL: url,
});

securityApi.interceptors.request.use((config) => {
  //set Auth Token.
  const storedData: string = localStorage.getItem("auth-storage")!;
  const parsedData = JSON.parse(storedData);
  config.headers.Authorization = `Bearer ${parsedData?.state?.tokens?.token || null}`;
  //set language headers.
  const language: string = localStorage.getItem("language") || "en";
  config.headers["Accept-Language"] = config.headers['Accept-Language'] || language;
  return config;
});

export { securityApi };






