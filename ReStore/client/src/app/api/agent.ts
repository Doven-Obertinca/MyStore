/* eslint-disable @typescript-eslint/ban-types */


import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500)) ;

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;



function responseBody(response: AxiosResponse) {
  return response.data;
}

axios.interceptors.response.use(async response => {
  await sleep();

  return response
}, (error: AxiosError) => {
  const {data, status} = error.response as AxiosResponse;
  switch (status) {
      case 400:
          if (data.errors) {
              const modelStateErrors: string[] = [];
              for (const key in data.errors) {
                  if (data.errors[key]) {
                      modelStateErrors.push(data.errors[key])
                  }
              }
              throw modelStateErrors.flat();
          }
          toast.error(data.title);
          break;
      case 401:
          toast.error(data.title);
          break;
      case 403: 
          toast.error('You are not allowed to do that!');
          break;
          case 404:
        toast.error("Resource not found");
        // Handle 404 error appropriately, e.g., show a message or redirect
        break;
      case 500:
          router.navigate('/server-error', {state: {error: data}});
          break;
      default:
          break;
  }

  return Promise.reject(error.response);
})


// const requests = {
//   get: (url: string) => axios.get(url).then(responseBody),
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//   // eslint-disable-next-line @typescript-eslint/ban-types
//   put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
//   delete: (url: string) => axios.delete(url).then(responseBody),
// };
const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
  // eslint-disable-next-line @typescript-eslint/ban-types
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) => axios.post(url, data, {
      headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody),
  putForm: (url: string, data: FormData) => axios.put(url, data, {
      headers: {'Content-type': 'multipart/form-data'}
  }).then(responseBody)
}

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
