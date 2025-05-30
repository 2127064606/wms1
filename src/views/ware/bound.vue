<script setup>
import { useUserApi } from '@/api/user/user';
import { boundIn, getCurrentWareProducts,boundOut } from '@/api/ware/bound';
import { getTypeData } from '@/api/ware/type';
import { ref,onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const inOutForm = ref({
  id:'',
  name: '',
  number: '',
  type: 1, // 入库或出库
  typeId:'',
  userId:''
})

const useUser = useUserApi()
const productData = ref([])
const typeData = ref([])

const getAllTypeData = async() =>{
  const res = await getTypeData();
  if(res.code){
    typeData.value = res.data;
  }
}

const search = async()=>{
  const res = await getCurrentWareProducts(useUser.currentUser.value.id);
  if(res.code){
    productData.value = res.data;
  }
}

const resetNumber = ()=>{
  choose.value = '';
  ptNumber.value = 0;
}

const resetInOutForm = ()=>{
  inOutForm.value.id = '';
  inOutForm.value.name = '';
  inOutForm.value.number = '';
  inOutForm.value.type = 1; // 入库或出库
  inOutForm.value.typeId = '';
}
const handleSubmit = async() => {
  let res;
  inOutForm.value.userId = useUser.currentUser.value.id;
  if(inOutForm.value.type === 1){
    // 入库
   res = await boundIn(inOutForm.value)
   console.log(res);
  }else{
   res = await boundOut(inOutForm.value)
   console.log(res);
  }

  if(res.code){
    ElMessage.success('操作成功!');
    search();
    resetNumber();
    resetInOutForm();
  }else{
    ElMessage.error(res.msg);
  }
}


onMounted(()=>{
  useUser.getLocalUser();
  getAllTypeData();
  search();
})


const ptNumber = ref(0)
const choose = ref('')

const setPtNumber = (id)=>{
  ptNumber.value = productData.value.find(item=>item.id === id).number;
}
</script>

<template>
  <div>
    <h1>出入库管理</h1>
    <ElForm :model="inOutForm" label-width="80px">
      <ElFormItem label="商品名称" v-if="inOutForm.type === 1">
        <ElInput v-model="inOutForm.name"  />
      </ElFormItem>
      <ElFormItem label="商品名称" v-else>
        <el-select v-model="inOutForm.id">
          <el-option
            v-for="item in productData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />         
        </el-select>
      </ElFormItem>

      <ElFormItem label="商品类型" v-if="inOutForm.type === 1">
        <el-select v-model="inOutForm.typeId">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>         

      </ElFormItem>
       
      <ElFormItem label="数量">
        <ElInput v-model="inOutForm.number" type="number" />
      </ElFormItem>
      <ElFormItem label="类型">
        <el-select v-model="inOutForm.type" placeholder="请选择--">
          <el-option :value="1" label="入库"/>
          <el-option :value="2" label="出库"/>
        </el-select>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleSubmit">提交</ElButton>
      </ElFormItem>
    </ElForm>
    <el-divider />
    
    
      <el-row :gutter="20">
        <el-col :span="8"> 
     <label>产品:<el-select class="yuo" v-model="choose"  @change="setPtNumber(choose)">
      <el-option
       v-for="item in productData"
       :key="item.id"
       :label="item.name"
       :value="item.id"
      >
      </el-option>
    </el-select></label>
    </el-col>
    <el-col :span="8">
      入库数量: <br/><el-text  class="mx-1" type="primary" size="large">{{ptNumber}}</el-text>
    </el-col>
  </el-row>
  </div>
</template>

<style scoped>
/* 可添加自定义样式 */

</style>