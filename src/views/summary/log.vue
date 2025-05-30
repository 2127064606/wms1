<script setup>
 import { ref,onMounted } from 'vue'

 import { getAllLog } from '@/api/summary/log'


 const tableData = ref([])

 const currentPage4 = ref(1)
 const pageSize4 = ref(10)
 const totals = ref(0)

 const search = async()=>{
   const res = await getAllLog(currentPage4.value,pageSize4.value); 
   if(res.code){
     tableData.value = res.data.rows;
     totals.value = res.data.totals;
   }
 }


 const handleCurrentChange = async(val) =>{
   currentPage4.value = val;
   search(); 
 }

 const handleSizeChange = async(val)=>{
   pageSize4.value = val;
   search(); 
 }
 onMounted(()=>{
   search(); 
 })
</script>


<template>
   <el-table :data="tableData" border style="width: 100%">
    <el-table-column type=index label="序号" width="120" />
    <el-table-column prop="userName" label="操作人姓名" width="180" />
    <el-table-column prop="operateType" label="操作类型" width="120"/>
    <el-table-column prop="wareName" label="仓库名称" width="120"/>
    <el-table-column prop="productName" label="产品名称"/>
    <el-table-column prop="operateNumber" label="操作数量" width="120"/>
    <el-table-column prop="operateTime" label="操作时间"/>
    <el-table-column prop="costTime" label="耗时" />
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
</template>


<style scoped>

</style>