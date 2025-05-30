import request from "@/request";


export const getAllAdmin = (page,pageSize,name,gender) =>
  request.get(`/admin?page=${page}&pageSize=${pageSize}&name=${name}&gender=${gender}`)

export const appendAdmin = (data) =>
  request.post(`/admin`,data)

export const selectAdminById = (id) =>
  request.get(`/admin/${id}`)

export const updateAdmin = (data) =>
  request.put(`/admin`,data)

export const deleteAdmin = (id) =>
  request.delete(`/admin/${id}`)

export const getAllAdminNotPage = () =>{
  return request.get(`/admin/data`)
}


