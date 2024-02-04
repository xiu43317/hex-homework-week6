<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
      <div class="col-8">
        <form class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              v-model="emailInput"
              id="floatingInput"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              v-model="pwInput"
              id="floatingPassword"
              placeholder="Password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button
            class="btn btn-lg btn-primary w-100 mt-3"
            type="submit"
            @click.prevent="login"
          >
            登入
          </button>
        </form>
      </div>
    </div>
    <p class="mt-5 mb-3 text-muted">&copy; 2023~∞ - 六角學院</p>
  </div>
</template>
<style>
html,
body {
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
</style>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      emailInput: '',
      pwInput: ''
    }
  },
  methods: {
    login () {
      const username = this.emailInput
      const password = this.pwInput
      const user = {
        username,
        password
      }
      // #2 發送 API 至遠端並登入（並儲存 Token）
      const url = import.meta.env.VITE_APP_API_URL
      axios.post(`${url}/admin/signin`, user).then((res) => {
        const {
          token,
          expired
        } = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`
        alert(res.data.message)
        // console.log(res)
        location.href = '/admin/products'
      }).catch((error) => {
        // console.dir(error)
        alert(error.response.data.message)
      })
    }
  }
}
</script>
