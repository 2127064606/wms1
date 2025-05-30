import request from "@/request";


export const getAllLog = (page, pageSize) =>
  request.get(`/log?page=${page}&pageSize=${pageSize}`);