<template>
<div>
  <div class="h3 text-center">這是後台介面</div>
  <div class="text-center">
    <router-link to="/">回到前台</router-link> |
    <router-link to="/admin/products">後台產品列表</router-link> |
    <router-link to="/admin/orders">後台訂單</router-link> |
    <a href="#" @click.prevent="signOut">登出</a>
  </div>
  <router-view v-if="checkSuccess"></router-view>
</div>
</template>
<script>
import axios from 'axios'
const url = import.meta.env.VITE_APP_API_URL
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
axios.defaults.headers.common.Authorization = token
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      axios
        .post(`${url}/api/user/check`)
        .then((res) => {
          this.checkSuccess = true
        })
        .catch((error) => {
          console.dir(error)
          alert(error.response.data.message)
          this.$router.push('/login')
        })
    },
    signOut () {
      document.cookie = 'hexToken=;expires=;'
      alert('Token已清除')
      this.$router.push('/login')
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
