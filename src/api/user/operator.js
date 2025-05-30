import request from '@/request'




export const getAllOperator = (page,pageSize,name,gender,wareId) =>
  request.get(`/operator?page=${page}&pageSize=${pageSize}&name=${name}&gender=${gender}&wareId=${wareId}`)

export const appendOperator = (data) =>
  request.post(`/operator`,data)

export const selectOperatorById = (id) =>
  request.get(`/operator/${id}`)


export const updateOperator = (data) =>
  request.put(`/operator`,data)

export const deleteOperator = (id) =>
  request.delete(`/operator/${id}`)

