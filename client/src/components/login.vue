<template>
  <div class="login-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="用户名" prop="user">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" type='password'></el-input>
      </el-form-item>
        <el-form-item>
        <el-button type="primary" @click.prevent='login'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import store from '@/store'
import axios from '@/http'

export default {
  pwd: 'login',
  data(){
    return {
      user: '',
      pwd: '',
      ruleForm: {
        user: '',
        pwd: ''
      },
      rules: {
          user: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    login: function() {
      console.log("you click the login button")
      let params = new URLSearchParams()
      console.log(this.user)
      params.append('user',this.ruleForm.user)
      params.append('pwd',this.ruleForm.pwd)
      axios.post('http://127.0.0.1:3000/login',params)
      .then((res) => {
        console.log(res)
        if (res.data.success){
          let data = {
            token: res.data.message,
            user: this.ruleForm.user
          }
          store.commit('login',data)
          this.$router.push({
            path: decodeURIComponent('/admin')
          })
        }else{
          alert(res.data.message)
        }  
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.login-box{
  width:600px;
  margin:0 auto;
}

</style>
