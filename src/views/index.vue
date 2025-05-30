<script setup>
import { ref, onMounted, computed } from 'vue'
import { User, Cellphone, OfficeBuilding, Calendar } from '@element-plus/icons-vue'
import { getAllWare, getAllWareData, getWareIdsByUserId } from '@/api/ware/ware'
import { useUserApi } from '@/api/user/user'
import { useStore } from 'vuex'
import { userStore} from '@/api/user/useStore'

/* const userInfo = ref({
  name:'',
  role:'',
  username:'',
  password:'',
  wareIds:[],
  gender:'',
  id:''
}) */

const useUser = useUserApi()

const currentUser = computed(()=> userStore.state.currentUser)
// 在script部分添加wareIds的响应式引用
const wareData = ref([])

// 获取用户信息
const  getUserInfo = () => { 
  //useUser.getLocalUser();
  userStore.commit('getLocalStorageUser');
}

//获取仓库id
const getWareIds = async() =>{
  //let res;
 /*  if(useUser.currentUser.value.role === 1){
    const data = {name:'',userId:useUser.currentUser.value.id}
     res = await getAllWare(data.name,data.userId);
  }else if(useUser.currentUser.value.role === 2){
    //TODO:有错误
     res = await selectOperatorById(useUser.currentUser.value.id);
  } */
  const res = await getWareIdsByUserId(userStore.state.currentUser.id);
  //console.log(res);
  if(res.code){
   // console.log(res.data);
      //useUser.currentUser.value.wareIds = res.data;
      userStore.state.currentUser.wareIds = res.data;
    }
}


// 获取仓库数据
const getWareData = async() => {
  const res = await getAllWareData();
  if(res.code){
    wareData.value = res.data; // 直接将响应式数据赋值给wareData
  }
}

// 修改getWareName方法
const getWareName = (id) => {
  const warehouse = wareData.value.find(item => item.id === id)
  return warehouse?.name || '未知仓库'
}

onMounted(() => {
  getUserInfo();
  getWareIds();
  getWareData();
})





</script>

<template>
  <div class="dashboard-container">
    <el-row justify="center">
      <el-col :xs="24" :sm="20" :lg="16">
        <el-card class="user-card">
          <div class="user-header">
            <el-avatar :size="100" :src="useUser.currentUser.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            <div class="user-meta">
              <h2 class="user-name">{{ currentUser.name }}</h2>
              <div class="user-role">
                <el-tag 
                  :type=" currentUser.role === 0? 'primary' : (currentUser.role === 1? 'success' : 'danger')" 
                  effect="dark"
                >
                  {{ currentUser.role === 0? '超级管理员': (currentUser.role === 1 ? '管理员' : '仓库操作员') }}
                </el-tag>
                <span class="user-id">ID: {{ currentUser.id }}</span>
              </div>
            </div>
          </div>

          <el-divider />

          <el-descriptions :column="2" border>
            <el-descriptions-item label="性别" width="150px">
              <el-tag :type="currentUser.gender == 1 ? 'primary' : 'danger'">
                {{ currentUser.gender == 1 ? '男' : '女' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="联系电话">
              <div class="contact-info">
                <el-icon><Cellphone /></el-icon>
                {{ currentUser.phone || '暂无' }}
              </div>
            </el-descriptions-item>
           // 修改模板中的仓库显示部分
  <el-descriptions-item label="所属仓库">
  <div class="warehouse-info">
    <el-icon><OfficeBuilding /></el-icon>
    <template v-if="currentUser.wareIds?.length">
      <el-tag
        v-for="wareId in currentUser.wareIds"
        :key="wareId" 
        type="info"
        style="margin-right: 5px;"
      >
        {{ getWareName(wareId) }}
      </el-tag>
    </template>
    <span v-else>暂未分配仓库</span>
  </div>
  </el-descriptions-item>
            <el-descriptions-item label="入职日期">
              <div class="date-info">
                <el-icon><Calendar /></el-icon>
                {{ currentUser.entryDate || '2024-01-01' }}
              </div>
            </el-descriptions-item>
            
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.user-card {
  margin-bottom: 20px;
  border-radius: 12px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-name {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.stat-item {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  color: #fff;
  
  &.warning { background: #e6a23c }
  &.success { background: #67c23a }
  &.danger { background: #f56c6c }
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
}

:deep(.el-descriptions__body) {
  background: #fafafa;
}

.contact-info,
.warehouse-info,
.date-info {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>

