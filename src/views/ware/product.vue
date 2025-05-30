<script setup>
import { ref,onMounted } from 'vue'

import {
  Delete,
  Search,
} from '@element-plus/icons-vue'

import { selectAllProduct } from '@/api/ware/product'
import {  getAllWareData } from '@/api/ware/ware'
import { getTypeData } from '@/api/ware/type'

const tableData  = ref([])
const wareData  = ref([])
const typeData = ref([])

const formInline = ref({
  name:'',
  wareId:''
}) 

const search = async() =>{
  const res = await selectAllProduct(formInline.value.name,formInline.value.wareId);
  if(res.code){
    tableData.value = res.data;
  }
}

const onSubmit = async() =>{
  search();
}


const onReset = async() =>{
  formInline.value.name = '';
  formInline.value.wareId = '';
  search();
}

const getWareData = async() =>{
  const res = await getAllWareData();
  if(res.code){
    wareData.value = res.data;
  }
}

const getType = async() =>{
  const res = await getTypeData();
  if(res.code){
    typeData.value = res.data; 
  }
}

 const getWareName = (id) =>{
  for(let i=0;i<wareData.value.length;i++){
    if(wareData.value[i].id === id){
      return wareData.value[i].name;
    }
  }
  return null;
 }

 const getTypeName = (id) =>{
  for(let i=0;i<typeData.value.length;i++){
    if(typeData.value[i].id === id){
      return typeData.value[i].name;
    }
  }
  return null;
 }

onMounted(()=>{
  search();
  getWareData();
  getType();
})
</script>


<template>

  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="产品名">
      <el-input v-model="formInline.name" placeholder="请输入产品名..." clearable />
    </el-form-item>
    <el-form-item label="所属仓库">
      <el-select
        v-model="formInline.wareId"
        placeholder="请选择--"
        clearable
      >
        <el-option
         v-for="item in wareData"
         :key="item.id"
         :label="item.name"
         :value="item.id" 
         />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button :icon="Search" circle @click="onSubmit"/>
      <el-button :icon="Delete" circle @click="onReset"/>
    </el-form-item>
  </el-form>

   <el-table :data="tableData" border stripe style="width: 100%" height="630">
    <el-table-column type="index" label="索引" width="180" />
    <el-table-column prop="name" label="产品名"  />
    <el-table-column  label="产品类型">
      <template #default="scope">
        {{getTypeName(scope.row.typeId)}}
      </template>
    </el-table-column>
    <el-table-column  label="所属仓库">
      <template #default="scope">
        <el-tag type="primary"
        >{{getWareName(scope.row.wareId)}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="number" label="库存数量"  />
  </el-table>
</template>


<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>