import axios from "axios";

const http = axios.create({});


export const HttpGet = function(url) {
  return new Promise((reslove,reject)=>{
    axios.get(url).then((res)=>{
      reslove(res.data)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export const HttpPost = function(url,params) {
  const param = JSON.stringify(params)
  return new Promise((reslove,reject)=>{
    axios.post(url,param).then((res)=>{
      reslove(res)
    }).catch((err)=>{
      reject(err)
    })
  })
}

export default http;