<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="学号" prop="sno">
        <el-input v-model="ruleForm.sno"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
      <table class="baseinfo-infotable">
        <tr class="baseinfo-infotable-tr">
          <th>学号</th>
          <th>姓名</th>
          <th>性别</th>
          <th>生日</th>
        </tr>
        <tr v-for="(row,index) in tableData" class="baseinfo-infotable-tr">
          <td>{{ row.sno }}</td>
          <td>{{ row.sname }}</td>
          <td>{{ row.ssex }}</td>
          <td>{{ row.sbrith }}</td>
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
      tableData: [],
      ruleForm: {
        sno: '',
        name: ''
      },
      rules: {
          sno: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 9, max: 9, message: '学号长度为9位', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = new URLSearchParams()
          params.append('sno',this.ruleForm.sno)
          params.append('sname',this.ruleForm.name)
          axios.post("http://127.0.0.1:3000/baseinfo",params)
          .then((res) => {
            console.log(res)
            if(res.data.success){
              this.tableData = res.data.result
            }else{
              alert("该学生不存在")
            }
          })
          .catch((err) => {
            alert("获取表格数据失败")
          })
        } else {
          alert('提交失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.baseinfo-infotable{
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
.baseinfo-infotable-tr{
  display: block;
  width:800px;
}
.baseinfo-infotable-tr td,.baseinfo-infotable-tr th{
  width:160px;
  height:48px;
  line-height:48px;
  border-top:1px solid #ebebeb;
  border-left:1px solid #ebebeb;
}
form{
  margin-top:60px;
  width:560px;
  transform: translateX(-45px);
}
.el-select {
    display: inline-block;
    position: relative;
    width:100%;
}
.el-col-11 {
    width: 100%;
}
.el-input__icon{
  height: 80%;
}
</style>
