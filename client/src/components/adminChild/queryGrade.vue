<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="学号" prop="sno">
        <el-input v-model="ruleForm.sno"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <p>所有科目平均成绩：{{ allAVG }}</p>
    <p>必修科目平均成绩：{{ muAVG }}</p>
    <table class="baseinfo-infotable">
      <tr class="baseinfo-infotable-tr">
        <th>姓名</th>
        <th>课程名</th>
        <th>成绩</th>
        <th>是否补考</th>
      </tr>
      <tr v-for="(row,index) in tableData" class="baseinfo-infotable-tr">
        <td>{{ row.sname }}</td>
        <td>{{ row.cname }}</td>
        <td>{{ row.grade }}</td>
        <td>{{ row.reexam }}</td>
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
      allAVG: '',
      muAVG: '',
      ruleForm: {
        sno: ''
      },
      rules: {
          sno: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 9, max: 9, message: '学号长度为9位', trigger: 'blur' }
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
          axios.post("http://127.0.0.1:3000/querygrade",params)
          .then((res) => {
            console.log(res)
            if(res.data.success){
              this.tableData = res.data.result
              this.allAVG = res.data.allAVG
              this.muAVG = res.data.muAVG
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
</style>
