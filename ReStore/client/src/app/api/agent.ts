

import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api/";


const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.data) {
      const { data, status } = error.response as AxiosResponse;
      switch (status) {
        case 400:
          if(data.errors){
            const modelStateErrors: string[] = [];
            for(const key in data.errors){
              if(data.errors[key]){
                modelStateErrors.push(data.erros[key])
              }
            }
            throw modelStateErrors.flat()
          }
          toast.error(data.title);
          break;
        case 401:
          toast.error(data.title);
          break;
        case 404:
          // Handle 404 Not Found error
          toast.error("Resource not found");
          if (error.config && error.config.url) {
            console.error("Resource not found:", error.config.url); // Log the URL for debugging
          } else {
            console.error("Resource not found - URL not available");
          }
          break;
        case 500:
          toast.error(data.title);
          break;
        default:
          break;
      }
      return Promise.reject(error.response);
    } else {
      // Handle non-HTTP errors here
      console.error("Network error:", error.message);
      // You can toast a general error message here if needed
      toast.error("An unexpected error occurred.");
      return Promise.reject(error);
    }
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requests.get('products'),
  details: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
  get400Error: () => requests.get('buggy/bad-request'),
  get401Error: () => requests.get('buggy/unauthorized'),
  get404Error: () => requests.get('buggy/not-found'),
  get500Error: () => requests.get('buggy/server-error'),
  getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
  Catalog,
  TestErrors
};

export default agent;
