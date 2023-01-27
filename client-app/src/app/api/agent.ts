import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string) => axios.get(url).then<T>(responseBody),

  post: <T>(url: string, body: object) =>
    axios.post(url, body).then<T>(responseBody),

  put: <T>(url: string, body: object) =>
    axios.put(url, body).then<T>(responseBody),

  del: <T>(url: string) => axios.get(url).then<T>(responseBody),
};

const Activities = {
  list: () => request.get<Activity[]>("/activities"),
  details: (id: string) => request.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => axios.post("/activities", activity),
  update: (activity: Activity) =>
    axios.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => axios.delete<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
