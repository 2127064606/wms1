import request from "@/request";


export const getAllType = (page,pageSize,name,userId) =>
  request.get(`/type?page=${page}&pageSize=${pageSize}&name=${name}&userId=${userId}`)


export const appendType = (data) =>
  request.post(`/type`,data)

export const selectTypeById = (id) =>
  request.get(`/type/${id}`)

export const updateType = (data) =>
  request.put(`/type`,data)

export const deleteType = (id) =>
  request.delete(`/type/${id}`)

export const getTypeData = () =>
  request.get(`/type/data`)