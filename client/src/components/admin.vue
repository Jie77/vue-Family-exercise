<template>
  <div class="container" id="container">
    <div class="main" id="main">
      <h1>Hello {{ user }}</h1>
      <p>Here is admin page</p>
      <router-view></router-view>
    </div>
    <div class="sidebar">
      <div class="info">
        <div class="show">
          <img src="../assets/show.jpg" alt="头像" width="100px">
        </div>
        <p>contact:1007172767@qq.com</p>
      </div>
      <div class="nav">
        <ul>
          <li class="navlist"> <router-link :to="{name:'insertInfo'}">插入学生信息</router-link> </li>
          <li class="navlist"> <router-link :to="{name:'baseInfo'}">学生基本信息</router-link> </li>
          <li class="navlist"> <router-link :to="{name:'recordGrade'}">录入成绩</router-link> </li>
          <li class="navlist"> <router-link :to="{name:'queryGrade'}">查询成绩</router-link> </li>
          <li class="navlist"> <router-link :to="{name:'hisTeacher'}">历任教师</router-link> </li>
          <li class="navlist"> <router-link :to="{name:'dyingStu'}">预开除学生</router-link> </li>
        </ul>
      </div>
      <span class="menubtn">
        <i class="el-icon-menu" @click='showmeau'></i>
      </span>
    </div>
  </div>
</template>
<script>
import store from '@/store'
// import mainTable from './mainTable'
//import axios from '@/http'

export default {
  name: 'admin',
  data(){
    return {
      user: store.state.user,
      isshowBar:false
    }
  },
  methods: {
    showmeau:function(){
      if(this.isshowBar){
        document.getElementById('container').style.transform = "translateX(0px)"
        document.getElementById('main').style.transform = "translateX(0px)"
        this.isshowBar = false
      }else{
        document.getElementById('container').style.transform = "translateX(300px)"
        document.getElementById('main').style.transform = "translateX(-150px)"
        this.isshowBar = true
      }
    }
  }
}
</script>
<style>
*{
  padding:0;
  margin:0;
}
html,body{
  height:100%;
  width:100%;
}
a{
  text-decoration:none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#app{
  margin-top:0;
  height:100%;
  overflow-x:hidden;
}
.container{
  position: relative;
  height:100%;
  width:100%;
  transform: translateX(0px);
  transition:all .5s ease-in-out;
}
.main{
  width:100%;
  float:left;
  transition:all .5s ease-in-out;
  margin-top:50px;
}
.sidebar{
  box-sizing:border-box;
  width:360px;
  height:100%;
  padding-right:60px;
  float:left;
  margin-left:-100%;
  position: relative;
  left:-300px;
  border-right:1px solid #efefef;
}
.sidebar .info{
  height: 200px;
  width:100%;
  padding-top: 20px;
  border-bottom:1px solid #efefef;
}
.sidebar .nav{
  padding:20px;
}
.sidebar .nav ul{
  display:block;
  width:100%;
}
.sidebar .nav ul li{
  width:100%;
  list-style:none;
  text-align:center;
  height:48px;
  line-height:48px;
}
.menubtn{
  font-size:40px;
  position:absolute;
  right:10px;
  top:50%;
  margin-top:-20px;
}
.show{
  width:100px;
  height:100px;
  border:1px solid #efefef;
  border-radius:50%;
  overflow: hidden;
  margin:0 auto;
  margin-bottom:40px;
}
</style>



