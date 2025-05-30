import request from "@/request";


export const boundIn = (data) =>
  request.post("/bound",data)

export const boundOut = (data) =>
  request.put("/bound",data)

export const getCurrentWareProducts = (userId) =>
  request.get(`/bound/${userId}`)