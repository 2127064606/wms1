<script setup>
import {ref,onMounted} from 'vue'
import {
  Delete,
  Search,
} from '@element-plus/icons-vue'
import { 
  getAllAdmin,
  appendAdmin,
  selectAdminById,
  updateAdmin,
  deleteAdmin
} from '@/api/user/admin'
import { ElMessage,ElMessageBox } from 'element-plus'


const formInline = ref({
  name:'',
  gender:''
})

const tableData = ref([])

const currentPage4 = ref(1)
const pageSize4 = ref(10)
const totals = ref(0)

const search = async()=>{
  const res = await getAllAdmin(currentPage4.value,pageSize4.value,formInline.value.name,formInline.value.gender);
  console.log(res);
  if(res.code){
    tableData.value = res.data.rows;
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
  formInline.value.gender = '';
  formInline.value.name = '';
  search();
}

onMounted(()=>{
  search();
})

const form = ref(
  {
    id:'',
    name:'',
    username:'',
    password:'',
    gender:'',
    phone:'',
  }
)

const dialogFormVisible = ref(false)
const formTitle = ref('')

const resetForm = ()=>{
  form.value.name = '';
  form.value.username = '';
  form.value.password = '';
  form.value.gender = '';
  form.value.phone = '';
}
const addAdmin = ()=>{
  dialogFormVisible.value = true;
  formTitle.value = '新增管理员';
  resetForm();
}

const edit = async(id)=>{
  dialogFormVisible.value = true;
  formTitle.value = '编辑管理员';
  const res = await selectAdminById(id);
  if(res.code){
    form.value = res.data;
  }
}

const saveForm = async()=>{
  let res;
  if(form.value.id){
    res = await updateAdmin(form.value);
  }else{
    res = await appendAdmin(form.value);
  }
//提交表单后的处理
  if(res.code){
    ElMessage.success('操作成功!');
    dialogFormVisible.value = false;
    search();
  }else{
    ElMessage.error(res.msg);
  }
}

const del =async(id)=>{
  ElMessageBox.confirm(
    '你确定要删除该管理员吗?',
    '警告⚠',
    {
      confirmButtonText: ' 确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
     const res = await deleteAdmin(id);
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
    <el-form-item label="姓名">
      <el-input v-model="formInline.name" placeholder="请输入姓名..." clearable />
    </el-form-item>
    <el-form-item label="性别">
      <el-select
        v-model="formInline.gender"
        placeholder="请选择--"
        clearable
      >
        <el-option label="男" :value="1" />
        <el-option label="女" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" circle @click="onSubmit"/>
      <el-button :icon="Delete" circle @click="onReset"/>
      <el-button type="primary" @click="addAdmin">新增管理员</el-button>
    </el-form-item>
  </el-form>
  
 <el-table :data="tableData" border style="width: 100%">
    <el-table-column type=index label="序号" width="120" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="gender" label="性别" width="120">
      <template #default="scope">
        <el-tag>{{scope.row.gender==1?'男':'女'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="电话"></el-table-column>
    <el-table-column  label="权限">
      <el-tag>管理员</el-tag>
    </el-table-column>
    <el-table-column prop="entryDate" label="入职日期" ></el-table-column>
    <el-table-column prop="updateTime" label="更新时间"></el-table-column>
    <el-table-column label="操作">
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
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>