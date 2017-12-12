<template>
  <div class="loginbox">
      <form action="">
            <input type="text" placeholder="用户名" v-model='user'>
            <input type="text" placeholder="密码" v-model='pwd'>
            <button @click.prevent='reg'>提交</button>
      </form>
  </div>
</template>
<script>
import store from '@/store'
import axios from '@/http'
export default {
    name: 'login',
    data(){
        return {
            user: '',
            pwd: ''
        }
    },
    methods: {
        reg: function() {
            console.log("you click the register button")
            let params = new URLSearchParams()
            console.log(this.user)
            params.append('user',this.user)
            params.append('pwd',this.pwd)
            axios.post('http://127.0.0.1:3000/reg',params)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style>
*{
    padding:0;
    margin:0;
}
.loginbox{
    width:220px;
    min-width:60%;
    border: 1px solid #666;
    padding:10px 0;
    margin:0 auto;
}
form{
    width:200px;
    margin:0 auto;
}
input{
    display: block;
    height: 40px;
    width:200px;
}
input:first-child{
    margin-bottom:10px;
}
button{
    margin-top:10px;
}
</style>
