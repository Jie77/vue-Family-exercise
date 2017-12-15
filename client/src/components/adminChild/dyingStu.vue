<template>
  <div class="dyingstu-content">
    <p class="red">标红的代表挂科分数超出教学计划限定</p>
    <table class="dyingstu">
      <tr class="dyingstu-tr">
        <th>学号</th>
        <th>姓名</th>
        <th>不及格必修总学分</th>
        <th>不及格选修总学分</th>
      </tr>
      <tr v-for="(row,index) in tableData" class="dyingstu-tr">
        <td>{{ row.sno }}</td>
        <td>{{ row.sname }}</td>
        <td :class="{ red: row.mu>10 }">{{ row.mu }}</td>
        <td :class="{ red: row.notmu>20 }">{{ row.notmu }}</td>
      </tr>
    </table>
  </div>
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
    axios.post("http://127.0.0.1:3000/dyingstu",{})
    .then((res) => {
      console.log(res)
      this.tableData = res.data.result
    })
    .catch((err) => {
      console.log("获取表格数据失败")
    })
  }
}
</script>

<style>
.dyingstu-content{
  margin-top:40px;
}
.dyingstu{
  display:block;
  width:640px;
  margin:0 auto;
  margin-top:20px;
  margin-bottom:60px;
  box-sizing:border-box;
  font-size:14px;
  color:#606266;
  border-bottom:1px solid #ebebeb;
  border-right:1px solid #ebebeb;
  border-spacing: 0;
}
.dyingstu-tr{
  display: block;
  width:800px;
}
.dyingstu-tr td,.dyingstu-tr th{
  width:160px;
  height:48px;
  line-height:48px;
  border-top:1px solid #ebebeb;
  border-left:1px solid #ebebeb;
}
.red{
  color:red;
}
</style>
