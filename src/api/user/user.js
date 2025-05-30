import request from "@/request";
import { ref } from "vue";

export const updateUser = (data) =>
  request.put(`/user`,data)


export const useUserApi = () =>{
  
   const currentUser = ref({
    name:'',
    role:'',
    username:'',
    password:'',
    wareIds:[],
    phone:'',
    gender:'',
    id:'',
    entryDate:''
  })

  const getLocalUser = ()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
    currentUser.value = user;
  }
}

  const setLocalUser = (user)=>{
    currentUser.value = user;
    localStorage.setItem('user',JSON.stringify(user));
  }

  const updateUser = (data) =>{
    currentUser.value.name = data.name;
    currentUser.value.phone = data.phone;
    currentUser.value.gender = data.gender;
    currentUser.value.username = data.username;
    currentUser.value.password = data.password;
    currentUser.value.wareIds = data.wareIds;
    //window.location.reload();
  }


  const clearUser = ()=>{
    currentUser.value = null;
    localStorage.removeItem('user');
  }

  return {currentUser,setLocalUser,updateUser,clearUser,getLocalUser}
}

 

