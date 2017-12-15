<template>
  <table class="gradetable">
    <tr v-for="(row,index) in tableData" class="gradetable-tr">
      <!-- <td>
        <span v-show='istext[index]'>{{ row.name }}</span>
        <el-input v-model="row.name" v-show='!istext[index]'></el-input>  
      </td> -->
      <td>{{ row.sno }}</td>
      <td>{{ row.sname }}</td>
      <td>{{ row.ssex }}</td>
      <td>{{ row.sbrith }}</td>
      <!-- <td> <el-button type="primary" plain @click='edit(index)'>编辑</el-button> </td> -->
    </tr>
  </table>
</template>

<script>
import store from '@/store'
import axios from '@/http'
export default {
  data() {
    return {
      user: store.state.user,
      tableData: []
    }
  },
  created () {
    let params = new URLSearchParams()
    params.append('user',this.user)
    axios.post("http://127.0.0.1:3000/tdata",params)
    .then((res) => {
      console.log(res)
      this.tableData = res.data
    })
    .catch((err) => {
      console.log("获取表格数据失败")
    })
  }
}
</script>

<style>
.gradetable{
  display:block;
  width:640px;
  margin:0 auto;
  margin-top:20px;
  box-sizing:border-box;
  font-size:14px;
  color:#606266;
  border-bottom:1px solid #ebebeb;
  border-right:1px solid #ebebeb;
  border-spacing: 0;
}
.gradetable-tr{
  display: block;
  width:800px;
}
.gradetable-tr td{
  width:160px;
  height:48px;
  line-height:48px;
  border-top:1px solid #ebebeb;
  border-left:1px solid #ebebeb;
}
.el-input{
  width:180px;
}
input:first-child {
    margin-bottom: 0px;
}
</style>
