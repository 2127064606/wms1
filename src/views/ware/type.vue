<script setup>
import {ref,onMounted} from 'vue'
import {
  Delete,
  Search,
} from '@element-plus/icons-vue'
import {
   appendType,
    getAllType,
    updateType,
    selectTypeById,
   deleteType,
   } from '@/api/ware/type';
import { ElMessage,ElMessageBox } from 'element-plus';
import { useUserApi } from '@/api/user/user';
import { getAllAdminNotPage } from '@/api/user/admin';
import { userStore } from '@/api/user/useStore';

const useUser = useUserApi();

const formInline = ref({
  name:'',
  userId:''
})


const adminData =  ref([]);
const tableData = ref([])

const currentPage4 = ref(1)
const pageSize4 = ref(10)
const totals = ref(0)


const getAdminData = async()=>{
  const res = await getAllAdminNotPage();
  if(res.code){
    adminData.value = res.data;
  }
}
const search = async()=>{
  const res = await getAllType(currentPage4.value,pageSize4.value,formInline.value.name,formInline.value.userId);
  if(res.code){
    tableData.value = res.data.rows;
    totals.value = res.data.totals;
  }
}

const handleCurrentChange = async(val) =>{
  currentPage4.value = val;
  search();
}

const handleSizeChange = async(val) =>{
  pageSize4.value = val;
  search();
}

const onSubmit = ()=>{
  search(); 
}

const onReset = ()=>{
  formInline.value.name = '';
  formInline.value.userId = '';
  search(); 
}

onMounted(()=>{
  getAdminData();
  search(); 
  //useUser.getLocalUser();
  userStore.commit('getLocalStorageUser');
})

const form = ref({
  id:'',
  name:'',
  userId:''
})

const formTitle = ref('')
const dialogFormVisible = ref(false)

const  resetForm = ()=>{
  form.value.id = '';
  form.value.name = '';
}
const addType = ()=>{
  formTitle.value = '新增分类';
  dialogFormVisible.value = true;
  form.value.userId = userStore.state.currentUser.id;
  resetForm();
}

const edit = async(id)=>{
  dialogFormVisible.value = true;
  formTitle.value = '编辑分类';
  const res = await selectTypeById(id);
  if(res.code){
    form.value = res.data;
  }
}

const saveForm = async()=>{
  let res;
  if(form.value.id){
    res = await updateType(form.value);
  }else{
    res = await appendType(form.value);
  }

  if(res.code){
    ElMessage.success('保存成功!');
    dialogFormVisible.value = false;
    search();
  }else{
    ElMessage.error(res.msg);
  }
}

const del =async(id)=>{
  ElMessageBox.confirm(
    '你确定要删除该分类吗?',
    '警告⚠',
    {
      confirmButtonText: ' 确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
     const res = await deleteType(id);
     if(res.code){
      ElMessage.success('操作成功!');
      search();
     }else{
      ElMessage.error(res.msg);
     }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除!',
      })
    })
}

</script>


<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="分类名">
      <el-input v-model="formInline.name" placeholder="请输入分类名..." clearable />
    </el-form-item>
    <el-form-item label="管理员">
      <el-select
        v-model="formInline.userId"
        placeholder="请选择--"
        clearable
      >
        <el-option
          v-for="item in adminData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" circle @click="onSubmit"/>
      <el-button :icon="Delete" circle @click="onReset"/>
      <el-button type="primary" @click="addType" :disabled="useUser.currentUser.value.role === 0">新增分类</el-button>
    </el-form-item>
  </el-form>
  
 <el-table :data="tableData" border style="width: 100%">
    <el-table-column type=index label="序号" width="120" />
    <el-table-column prop="name" label="分类名" width="250" />
    <el-table-column label="创建人">
      <template #default="scope">
        <span
         v-for="item in adminData"
         :key="item.id"
        >{{scope.row.userId === item.id ? item.name : ''}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :size="default"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogFormVisible" :title="formTitle" width="300">
    <el-form :model="form">
      <el-form-item label="分类名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
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
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>