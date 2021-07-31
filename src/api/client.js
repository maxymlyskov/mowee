import { create } from "apisauce";
import authStorage from '../auth/storage'

const apiClient = create({
  baseURL: "http://192.168.0.106:4000/api",
});

apiClient.addAsyncRequestTransform(async(request)=>{
  const authToken = await authStorage.getToken();
  if(!authToken) return;
  request.headers['x-auth-token'] = authToken

})

export default apiClient;