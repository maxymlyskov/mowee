import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.0.106:4000/api",
});

export default apiClient;