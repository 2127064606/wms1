import request from "@/request";


export const selectAllProduct = (name,wareId) =>
  request.get(`/product?name=${name}&wareId=${wareId}`);