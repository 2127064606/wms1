<script setup>
import { updateUser } from '@/api/user/user';
import { ElMessage } from 'element-plus';
import {ref,onMounted, computed} from 'vue'
import { useRouter } from 'vue-router'
import { useUserApi } from '@/api/user/user';
import { userStore } from '@/api/user/useStore';

const role =ref(0);

const adminViewHide = ref(false);
const operatorViewHide = ref(false);
const warehouseManagerViewHide = ref(false);
const productViewHide = ref(false);
const typeViewHide = ref(false);
const boundViewHide = ref(false);
const logViewHide = ref(false);

/* const currentUserInfo = ref({
  name:'',
  role:'',
  username:'',
  password:'',
  wareIds:[],
  gender:'',
  id:''
}) */


const useUser = useUserApi();


const setLocalStorage = (data)=>{
  useUser.setLocalUser(data);
}
const getUserInfo = ()=>{
  userStore.commit('getLocalStorageUser');
  //role.value = useUser.currentUser.value.role;
  role.value = userStore.state.currentUser.role;
}

const ShiftRole = ()=>{
  switch(role.value){
    case 0:
      adminViewHide.value = false;
      operatorViewHide.value = false;
      warehouseManagerViewHide.value = false;
      productViewHide.value = false;
      typeViewHide.value = false;
      boundViewHide.value = true;
      logViewHide.value = false;
      break;
    case 1:
      adminViewHide.value = true;
      operatorViewHide.value = false;
      warehouseManagerViewHide.value = true;
      productViewHide.value = false;
      typeViewHide.value = false;
      boundViewHide.value = true;
      logViewHide.value = false;
      break;
    case 2:
      adminViewHide.value = true;
      operatorViewHide.value = true;
      warehouseManagerViewHide.value = true;
      productViewHide.value = true;
      typeViewHide.value = true;
      boundViewHide.value = false;
      logViewHide.value = false;
      break;
    default:break;
  }
}


onMounted(()=>{
  getUserInfo();
  ShiftRole();
  //....
})

const form = ref({
  id:'',
  name:'',
  username:'',
  password:'',
  gender:'',
  phone:''
})

const dialogFormVisible = ref(false);
//用户信息展示
const showDetail = ()=>{
  form.value.id = userStore.state.currentUser.id;
  form.value.name = userStore.state.currentUser.name;
  form.value.username = userStore.state.currentUser.username;
  form.value.password = userStore.state.currentUser.password;
  form.value.gender = userStore.state.currentUser.gender;
  form.value.phone = userStore.state.currentUser.phone;
  dialogFormVisible.value = true;
}



const saveForm = async()=>{
  const res = await updateUser(form.value);
  if(res.code){
    ElMessage.success('操作成功!');
    dialogFormVisible.value = false;
   // useUser.updateUser(form.value);
    userStore.commit('updateCurrentUser',form.value);
    //userStore.state.currentUser = form.value;
   // useUser.setLocalUser(useUser.currentUser.value);
   userStore.commit('setLocalStorageUser');
  }else{
    ElMessage.error(res.msg);
  }
}

//用户信息修改

const router = useRouter();
const loginOut = ()=>{
  localStorage.removeItem('user');
  router.push('/login');
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar style="height:730px">
        <el-menu
        router
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
    <el-menu-item index="index">首页</el-menu-item>
    <el-sub-menu index="2">
      <template #title>用户</template>
      <el-menu-item index="admin" :disabled="adminViewHide">管理员</el-menu-item>
      <el-menu-item index="operator" :disabled="operatorViewHide">操作员</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        仓库
      </template>
      <el-menu-item index="warehouseManager" :disabled="warehouseManagerViewHide">仓库管理</el-menu-item>
      <el-menu-item index="product" :disabled="productViewHide">商品管理</el-menu-item>
      <el-menu-item index="type" :disabled="typeViewHide">分类管理</el-menu-item>
      <el-menu-item index="bound" :disabled="boundViewHide">出入库</el-menu-item>
    </el-sub-menu>
    
    <el-sub-menu index="4">
      <template #title>
        统计
      </template>
      <el-menu-item index="log" :disabled="logViewHide">日志</el-menu-item>
    </el-sub-menu>
    </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="common-header" style="text-align: right; font-size: 12px">
          <h1>WMS仓库管理系统</h1>
          <div class="toolbar">
          <el-dropdown>
            <el-icon  size="large" style="margin-right: 8px; margin-top: 1px">
              <setting />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="showDetail"><el-icon><User /></el-icon>个人信息</el-dropdown-item>
                <el-dropdown-item><a @click="loginOut"><el-icon><Link /></el-icon>退出登录</a></el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span>{{useUser.currentUser.name}}</span>
        </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="formTitle" width="500">
    <el-form :model="form">
      <el-row  :gutter="20">
        <el-col :span="12">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      </el-col>
      <el-col :span="12">
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.gender" placeholder="请选择--">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="12">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        </el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="12">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="saveForm">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.common-layout .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.common-layout .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.common-layout .el-menu {
  border-right: none;
}
.common-layout .el-main {
  padding: 0;
}

h1{
 text-align: center;
 font-size: 25px;
 letter-spacing: 20px;
 margin:10px;
 color:#b0d0de;
 margin-left:17em;
 text-shadow: 1px 1px 1px #000;
}

.common-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
</style>