import { create } from "apisauce";
import authStorage from '../auth/storage'

const apiClient = create({
  baseURL: "https://old-mowee.onrender.com/api",
});

apiClient.addAsyncRequestTransform(async(request)=>{
  const authToken = await authStorage.getToken();
  if(!authToken) return;
  request.headers['x-auth-token'] = authToken

})

export default apiClient;
