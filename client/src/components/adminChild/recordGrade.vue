<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
    <el-form-item label="学号" prop="sno">
      <el-input v-model="ruleForm.sno"></el-input>
    </el-form-item>
    <el-form-item label="课程号" prop="cno">
      <el-input v-model="ruleForm.cno"></el-input>
    </el-form-item>
    <el-form-item label="成绩" prop="grade">
      <el-input v-model="ruleForm.grade"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">录入</el-button>
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
          cno: '',
          grade: ''
        },
        rules: {
          sno: [
            { required: true, message: '请输入学号', trigger: 'blur' },
            { min: 9, max: 9, message: '学号长度为9位', trigger: 'blur' }
          ],
          cno: [
            { required: true, message: '请输入课程号', trigger: 'blur' }
          ],
          grade: [
            { required: true, message: '请输入成绩', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = new URLSearchParams()
            let grade = this.ruleForm.grade
            params.append('sno',this.ruleForm.sno)
            params.append('cno',this.ruleForm.cno)
            params.append('grade',parseInt(grade))
            params.append('sclass',this.ruleForm.sno.slice(0,-2))
            axios.post("http://127.0.0.1:3000/recordGrade",params)
            .then((res) => {
              console.log(res)
              if (res.data.success){
                alert("提交成功")
              }else{
                alert("提交内容不正确")
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
</style>
