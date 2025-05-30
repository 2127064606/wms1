import request from "@/request";
export const loginApi = (username,password) =>
  request.get(`/login?username=${username}&password=${password}`)


