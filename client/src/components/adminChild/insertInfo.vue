<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
    <el-form-item label="学号" prop="sno">
      <el-input v-model="ruleForm.sno"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="ruleForm.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import axios from '@/http'
  export default {
    data() {
      return {
        ruleForm: {
          sno:'',
          name: '',
          sex: '',
          date: ''
        },
        rules: {
          sno: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 9, max: 9, message: '学号长度为9位', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let birth = this.ruleForm.date.getFullYear()+"-"+(this.ruleForm.date.getMonth()+1)+"-"+this.ruleForm.date.getDate()
            let params = new URLSearchParams()
            params.append('sno',this.ruleForm.sno)
            params.append('sname',this.ruleForm.name)
            params.append('ssex',this.ruleForm.sex)
            params.append('sbrith',birth)
            axios.post("http://127.0.0.1:3000/insertinfo",params)
            .then((res) => {
              if (res.data.success){
                alert("提交成功")
              }else{
                alert("提交失败")
              }
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
