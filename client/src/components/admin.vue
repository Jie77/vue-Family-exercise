<template>
  <div>
      <h1>Hello {{ user }}</h1>
      <p>Here is admin page</p>
      <main-table :tdata='tableData'></main-table>
  </div>
</template>
<script>
import store from '@/store'
import mainTable from './mainTable'
import axios from '@/http'

export default {
  name: 'admin',
  data(){
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
  },
  components: {
    mainTable
  }
}
</script>


