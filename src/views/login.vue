<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/user/login'
import { useUserApi } from '@/api/user/user'
import { userStore } from '@/api/user/useStore'


const userUser = useUserApi();
const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const loading = ref(false)


const setLocalStorage = (data)=>{
  userStore.state.currentUser = data;
  userStore.commit('setLocalStorageUser');
}
const handleLogin = async() => {
  if (!form.value.username || !form.value.password) {
    ElMessage.error('请输入用户名和密码');
    return;
  }
  
  loading.value = true;
  //这里调用你的登录API
  const res = await loginApi(form.value.username,form.value.password);
  if(res.code){
    setLocalStorage(res.data);
    ElMessage.success('登录成功!');
    loading.value = false;
    router.replace('/')
  }
}
</script>

<template>
<div class="login-container">
    <el-row justify="center" align="middle" style="height: 100vh">
      <el-col :xs="24" :sm="12" :md="8" :lg="6">
        <div class="login-box">
          <h2 style="text-align: center; margin-bottom: 30px;">WMS 仓储管理系统</h2>
          
          <el-form :model="form" label-width="0">
            <el-form-item>
              <el-input 
                v-model="form.username" 
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            
            <el-form-item>
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                show-password
                :prefix-icon="Lock"
                @keyup.enter="handleLogin"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button 
                type="primary" 
                style="width: 100%" 
                :loading="loading"
                @click="handleLogin"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.login-container {
  background: #f0f2f5;
  min-height: 100vh;
}

.login-box {
  background: #fff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>