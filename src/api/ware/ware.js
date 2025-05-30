import request from "@/request";


export const getAllWare = (name,userId) =>
  request.get(`/ware/wareManager?name=${name}&userId=${userId}`)

export const appendWare = (data) =>
  request.post(`/ware/wareManager`,data)

export const selectWareById = (id) =>
  request.get(`/ware/wareManager/${id}`)

export const updateWare = (data) =>
  request.put(`/ware/wareManager`,data)

export const deleteWare = (id) =>
  request.delete(`/ware/wareManager/${id}`)

export const getAllWareData = ()=>
  request.get(`/ware/data`)

export const getWareIdsByUserId = (userId) =>
  request.get(`/ware/wareManager/data/${userId}`)