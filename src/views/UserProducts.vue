<template>
  <myLoading :active="isLoading"></myLoading>
  <div class="text-center h3 mb-4">產品列表頁面</div>
  <!-- 產品Modal -->
  <user-product-modal
    ref="userProductModal"
    :product="tempProduct"
    @update="addToCart"
  ></user-product-modal>
  <!-- 產品Modal -->
  <div class="container">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td style="width: 200px">
            <div
              alt=""
              :style="{
                backgroundImage: 'url(' + item.imageUrl + ')',
              }"
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
            ></div>
          </td>
          <td>{{ item.title }}</td>
          <td>
            <div class="h5">{{ item.origin_price }} 元</div>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                :class="{'disabled':item.checkLoading}"
                @click="openModal(item)"
              >
                <font-awesome-icon icon="spinner" class="fa-spin" v-show="item.checkLoading"/>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                :class="{ 'disabled': item.isLoading }"
                @click="addToCart(item)"
              >
                <font-awesome-icon icon="spinner" class="fa-spin" v-show="item.isLoading"/>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import UserProductModal from '../components/UserProductModal.vue'
const url = import.meta.env.VITE_APP_API_URL
const path = import.meta.env.VITE_APP_API_NAME

export default {
  data () {
    return {
      cart: [],
      products: [],
      tempProduct: {},
      isLoading: true,
      isDiscount: false
    }
  },
  components: { UserProductModal },
  methods: {
    getProducts () {
      this.$http
        .get(`${url}/api/${path}/products/`)
        .then((res) => {
          // console.log(res.data.products);
          this.products = res.data.products
          for (let i = 0; i < this.products.length; i++) {
            this.products[i].isLoading = false
            this.products[i].checkLoading = false
          }
          // console.log(this.products);
          this.isLoading = false
        })
        .catch((error) => {
          console.dir(error)
          alert(error.data.message)
          this.isLoading = false
        })
    },
    updateCart (item, qty) {
      this.$http
        .post(`${url}/api/${path}/cart`, {
          data: {
            product_id: item.id,
            qty
          }
        })
        .then((res) => {
          // console.log(res.data.message);
          this.$refs.userProductModal.isLoading = false
          this.products.filter((item) => {
            return (item.isLoading = false)
          })
          alert(item.title + res.data.message)
          // console.log(this.products);
          this.$refs.userProductModal.closeModal()
          this.getCart()
        })
        .catch((err) => {
          // console.log(err);
          alert(err.message)
          this.$refs.userProductModal.isLoading = false
          this.products.filter((item) => {
            return (item.isLoading = false)
          })
        })
    },
    addToCart (product, qty = 0) {
      qty === 0
        ? (product.isLoading = true)
        : (this.$refs.userProductModal.isLoading = true)
      const index = this.cart.carts.findIndex((item) => item.id === product.id)
      // 購物車有這項目
      if (index !== -1 && qty !== 0) {
        this.updateCart(product, qty)
        // 表格上面的項目且購物車裡面有項目
      } else if (index !== -1 && qty === 0) {
        const totalQty = (this.cart[index].qty += 1)
        this.updateCart(product, totalQty)
        // 表格上面的項目且購物車沒有這項目
      } else if (index === -1 && qty === 0) {
        this.updateCart(product, 1)
        // 購物車沒有這項目
      } else {
        this.updateCart(product, qty)
      }
    },
    getCart () {
      this.$http
        .get(`${url}/api/${path}/cart`)
        .then((res) => {
          this.cart = { ...res.data.data }
          for (let i = 0; i < this.cart.carts.length; i++) {
            this.cart.carts[i].cancelLoading = false
          }
          // console.log(this.cart);
        })
        .catch((err) => {
          // console.dir(err);
          alert(err.data.message)
        })
    },
    openModal (item) {
      this.tempProduct = item
      item.checkLoading = true
      setTimeout(() => {
        this.$refs.userProductModal.openModal()
        item.checkLoading = false
      }, 500)
    }
  },
  computed: {},
  mounted () {
    this.getProducts()
    this.getCart()
  }
}
</script>
