<template>
  <div class="main">
    <el-table
    :data="tdata"
    stripe
    style="width: 100%">
      <el-table-column
      prop="date"
      label="日期"
      width="180">
      </el-table-column>
      <el-table-column
      prop="name"
      label="姓名"
      width="180">
      </el-table-column>
      <el-table-column
      prop="address"
      label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    props:['tdata']
  }
</script>

<style>
.main{
  margin:0 auto;
  margin-top:50px;
  width:60%;
  min-width:600px;
}
.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  text-align: left;
}
</style>
