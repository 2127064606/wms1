<script setup>
import {ref,onMounted} from 'vue'
import {
  Delete,
  Search,
} from '@element-plus/icons-vue'
import { 
  getAllWare,
  appendWare,
  updateWare,
  selectWareById,
  deleteWare,
} from '@/api/ware/ware';
import { getAllAdminNotPage } from '@/api/user/admin';
import { ElMessage,ElMessageBox } from 'element-plus';



const formInline = ref({
  name:'',
  userId:'',
})

const tableData = ref([]);

const adminData = ref([]);


const getAdminData = async()=>{
  const res = await getAllAdminNotPage();
  if(res.code){
    adminData.value = res.data;
  }
}
const search = async()=>{
  const res = await getAllWare(formInline.value.name,formInline.value.userId);
  if(res.code){
    tableData.value = res.data;
  }
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
})


const dialogFormVisible = ref(false)
const formTitle = ref('');


const form = ref({
  id:'',
  name:'',
  capacity:'',
  userId:''
})

const resetForm = ()=>{
  form.value.name = '';
  form.value.capacity = '';
  form.value.userId = '';
}
const addWare = ()=>{
  dialogFormVisible.value = true;
  formTitle.value = '添加仓库';
  resetForm();
}

const edit = async(id)=>{
  dialogFormVisible.value = true;
  formTitle.value = '编辑仓库';
  const res = await selectWareById(id);
  if(res.code){
    form.value = res.data;
  }
} 

const saveForm = async()=>{
  let res;
  if(form.value.id){
    //编辑
    res = await updateWare(form.value);
  }else{
    //添加
    res = await appendWare(form.value);
  }

  if(res.code){
    ElMessage.success('保存成功!');
    dialogFormVisible.value = false;
    search();
  }else{
    console.log(res.msg);
    ElMessage.error(res.msg);
  }
}

const del =async(id)=>{
  ElMessageBox.confirm(
    '你确定要删除该仓库吗?',
    '警告⚠',
    {
      confirmButtonText: ' 确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
     const res = await deleteWare(id);
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
    <el-form-item label="仓库名">
      <el-input v-model="formInline.name" placeholder="请输入仓库名..." clearable />
    </el-form-item>
    <el-form-item label="仓库管理员">
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
      <el-button type="primary" @click="addWare">新增仓库</el-button>
    </el-form-item>
  </el-form>
  
 <el-table :data="tableData" height="600" border style="width: 100%">
    <el-table-column type=index label="序号" width="120" />
    <el-table-column prop="name" label="仓库名" width="180" />
    <el-table-column  label="仓库管理员" width="120">
      <template #default="scope">
        <span v-for="item in adminData" :key="item.id">
          {{item.id == scope.row.userId ? item.name : ''}}</span>
      </template>
    </el-table-column>
    <el-table-column prop="capacity" label="容量" />
    <el-table-column prop="currentStore" label="当前库存"></el-table-column>
    <el-table-column prop="createTime" label="创建时间" ></el-table-column>
    <el-table-column prop="updateTime" label="更新时间"></el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

   <el-dialog v-model="dialogFormVisible" :title="formTitle" width="300">
    <el-form :model="form">
      <el-form-item label="仓库名" prop="name">
        <el-input v-model="form.name" placeholder="请输入仓库名..." clearable />
      </el-form-item>
      <el-form-item label="容量" prop="capacity">
        <el-input v-model="form.capacity" placeholder="请输入仓库容量..." clearable />
      </el-form-item>
      <el-form-item prop="userId" label="仓库管理员">
        <el-select v-model="form.userId">
          <el-option
           v-for="item in adminData"
           :key="item.id"
           :label="item.name"
           :value="item.id"
          ></el-option>
        </el-select>
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