import { createStore } from "vuex";


export const userStore = createStore({
  state: {
    currentUser:{
    name:'',
    role:'',
    username:'',
    password:'',
    wareIds:[],
    phone:'',
    gender:'',
    id:'',
    entryDate:''
    }
  },
  getters: {
    getCurrentUser: state => state.currentUser
  },
  mutations: {
    setCurrentUser(state,user){
      state.currentUser = user;
    },
    clearCurrentUser(state){
      state.currentUser = null;
    },
    updateCurrentUser(state,data){
      state.currentUser.name = data.name;
      state.currentUser.phone = data.phone;
      state.currentUser.gender = data.gender;
      state.currentUser.username = data.username;
      state.currentUser.password = data.password;
    },
    setLocalStorageUser(state){
      localStorage.setItem('user',JSON.stringify(state.currentUser));
    },
    getLocalStorageUser(state){
      const user = JSON.parse(localStorage.getItem('user'));
      if(user){
        state.currentUser = user;
      }
    }
  }
})