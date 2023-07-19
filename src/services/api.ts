import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders
}

const api = axios.create({
  baseURL: '/',
  timeout: 60000
});

api.interceptors.request.use(
  (config): AdaptAxiosRequestConfig => {
    // e.g Add headers or perform authentication

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Process the response data if needed

    return response;
  },
  (error: AxiosError) => {
    const { response } = error || {};

    try {
      if (response?.statusText?.includes('Internal Server Error')) {
        window.alert('Check your internet connection!');
      }
    }
    catch (error: any) {
      throw new Error(error);
    }
    
    return Promise.reject(error);
  }
);

export default api;
