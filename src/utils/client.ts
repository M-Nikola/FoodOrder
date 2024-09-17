import axios, {AxiosInstance} from 'axios';

const API_BASE_URL = 'https://fet.app.fsd.rs/api';

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use(config => {
  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjY1NTY4MzcsImV4cCI6MTcyNzQyMDgzNywicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibWlsb3NldmljLm5pa29sYUBnbWFpbC5jb20ifQ.Q64iV1VuMarwcjaWPsAe4snnnb-wMPhIIFx-Y_ZiPFU1Ye5okq0X0QT1gDIYXraaXIiv-f6fLSd9KAvt4hwaxQjcm_KeCyxqFgF4vKcCqOQ5jIgTESce8ViA5HpROPzOwlP3dZcBqpwKFoNHC2JYMtJd_j3j1SBAUI18ojlkm7zLN-tzvFGIJwflSYXcU4NYf5Cu_LWxwr7fMZ59eM4NIZHGjVcpyqpkT0_4gXOlEpDhyIYmN4ktKh7_mRragx2EtDQLZx6PZV9HGdR4vPCVn7cL2L3glxUBmwudcC_bdneBGaz0pkFZfvdY7xA_wqdmF157ZQ1q_z0LyiQZiI6RhQ';

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default client;
