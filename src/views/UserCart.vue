<template>
  <myLoading :active="isLoading"></myLoading>
  <div class="container">
    <div class="text-center h3 mb-3">購物車頁面</div>
    <!-- 購物車列表 -->
    <div class="text-end">
      <button class="btn btn-outline-danger" type="button" @click="clearCart()">
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                :class="{ disabled: item.cancelLoading }"
                @click="deleteItem(item)"
              >
                <font-awesome-icon
                  icon="spinner"
                  class="fa-spin"
                  v-show="item.cancelLoading"
                />
                x
              </button>
            </td>
            <td><a href="#" @click.prevent="goToProductDetail(item.product.id)">
              {{ item.product.title }}
              </a>
              <div class="text-success" v-show="item.final_total !== item.total">已套用優惠券</div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    min="1"
                    type="number"
                    class="form-control"
                    :disabled="isEntering"
                    v-model="item.qty"
                    @change="renewCart(item, item.qty)"
                  />
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-show="item.final_total !== item.total">折扣價：</small>
              <span :class="{'text-success':item.final_total !== item.total}">{{ item.final_total }}</span>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr v-show="cart.total !== cart.final_total">
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="row">
      <div class="col-4 ms-auto">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入折扣碼" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="couponCode">
          <button class="btn btn-outline-primary" type="button"
           :disabled="isDiscount"
           id="button-addon2" @click="sendCouponCode()">
          <font-awesome-icon
            icon="spinner"
            class="fa-spin"
            v-show="isDiscount"
          />
            送出折扣碼</button>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <v-form
        @submit="onSubmit"
        ref="form"
        class="col-md-6"
        v-slot="{ errors }"
      >
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <v-field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <v-field
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="user.name"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <v-field
            id="tel"
            name="電話"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            :rules="isPhone"
            v-model="user.tel"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <v-field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="message"
          ></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>
<script>
const url = import.meta.env.VITE_APP_API_URL
const path = import.meta.env.VITE_APP_API_NAME
export default {
  data () {
    return {
      user: {
        email: '',
        name: '',
        address: '',
        tel: ''
      },
      couponCode: '',
      message: '',
      cart: [],
      products: [],
      tempProduct: {},
      isDiscount: false,
      isLoading: false,
      isEntering: false
    }
  },
  methods: {
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    onSubmit () {
      if (this.cart.carts.length === 0) {
        alert('購物車不得為空')
      } else {
        // console.log(this.user);
        const userDetail = {
          data: {
            user: this.user,
            message: this.message
          }
        }
        this.$http
          .post(`${url}/api/${path}/order`, userDetail)
          .then((res) => {
            // console.log(res);
            alert(res.data.message)
            this.getCart()
          })
          .catch((err) => {
            // console.log(err);
            let str = ''
            err.data.message.forEach((item) => {
              str += item + '\n\r'
            })
            alert(str)
          })
      }
    },
    getCart () {
      this.isLoading = true
      this.$http
        .get(`${url}/api/${path}/cart`)
        .then((res) => {
          this.cart = { ...res.data.data }
          for (let i = 0; i < this.cart.carts.length; i++) {
            this.cart.carts[i].cancelLoading = false
          }
          this.isLoading = false
          // console.log(this.cart)
        })
        .catch((err) => {
          console.dir(err)
          // alert(err.data.message)
          this.isLoading = false
        })
    },
    renewCart (item, qty) {
      this.isEntering = true
      this.$http
        .put(`${url}/api/${path}/cart/${item.id}`, {
          data: {
            product_id: item.product.id,
            qty
          }
        })
        .then((res) => {
          // console.log(res.data.message);
          alert(res.data.message)
          this.isEntering = false
          this.getCart()
        })
        .catch((err) => {
          // console.log(err);
          alert(err.message)
          this.isEntering = false
        })
    },
    clearCart () {
      if (this.cart.carts.length === 0) {
        alert('購物車已經是空的')
        return
      }
      this.isLoading = true
      this.$http
        .delete(`${url}/api/${path}/carts`)
        .then((res) => {
          // console.log(res.data.message);
          this.isLoading = false
          alert('全部商品' + res.data.message)
          this.cart = { carts: [] }
        })
        .catch((err) => {
          // console.log(err);
          this.isLoading = false
          alert(err.message)
        })
    },
    deleteItem (product) {
      product.cancelLoading = true
      this.$http
        .delete(`${url}/api/${path}/cart/${product.id}`)
        .then((res) => {
          // console.log(res.data.message);
          alert(`${product.product.title}${res.data.message}`)
          product.cancelLoading = false
          this.getCart()
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.message)
          product.cancelLoading = false
        })
    },
    goToProductDetail (item) {
      this.$router.push(`/detail/${item}`)
    },
    sendCouponCode () {
      this.isDiscount = true
      const couponCode = {
        code: this.couponCode
      }
      this.$http.post(`${url}/api/${path}/coupon`, { data: couponCode })
        .then((res) => {
          // console.log(res)
          alert(res.data.message)
          this.getCart()
          this.isDiscount = false
        })
        .catch((err) => {
          // console.log(err)
          alert(err.response.data.message)
          this.isDiscount = false
        })
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
