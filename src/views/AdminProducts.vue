<template>
  <myLoading :active="isLoading"></myLoading>
  <div class="h3 text-center mt-4">後台產品列表</div>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="150">商品推薦</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            <span v-for="(star, index) in 5" :key="index">
              <span v-if="index + 1 <= item.stars">
                <font-awesome-icon icon="fas fa-star"/>
              </span>
              <span v-else>
                <i class="far fa-star"></i>
              </span>
            </span>
          </td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- openModal -->
    <edit-product
      :is-new="isNew"
      :temp-product="tempProduct"
      @get-products="getProducts"
      ref="productModal"
    ></edit-product>
    <!-- deleteModal -->
    <delete-product
      :product="tempProduct"
      @get-products="getProducts"
      ref="delProductModal"
    ></delete-product>
    <!-- pagination -->
    <admin-pagination
    :pages="pagination"
    @emit-page="getProducts"
    ref="pagination">
  </admin-pagination>
  </div>
</template>
<script>
import editProduct from '../components/EditModal.vue'
import deleteProduct from '../components/DeleteModal.vue'
import adminPagination from '../components/AdminPagination.vue'
const url = import.meta.env.VITE_APP_API_URL
const path = import.meta.env.VITE_APP_API_NAME
export default {
  data () {
    return {
      products: [],
      isNew: true,
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      editModal: '',
      delModel: '',
      isLoading: false
    }
  },
  methods: {
    checkLogin () {
      this.$http
        .post(`${url}/api/user/check`)
        .then((_res) => {
          this.getProducts()
        })
        .catch((_error) => {
          this.$router.push('/login')
        })
    },
    getProducts (page = 1) {
      this.isLoading = true
      this.$http
        .get(`${url}/api/${path}/admin/products?page=${page}`)
        .then((res) => {
          // console.log(res.data.products);
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((error) => {
          console.dir(error)
          this.isLoading = false
        })
    },
    openModal (status, item = {}) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        setTimeout(() => {
          this.$refs.productModal.openModal()
        }, 500)
      } else if (status === 'edit') {
        this.tempProduct = { ...item }
        this.isNew = false
        setTimeout(() => {
          this.$refs.productModal.openModal()
        }, 500)
      } else if (status === 'delete') {
        this.tempProduct = item
        setTimeout(() => {
          this.$refs.delProductModal.openModal()
        }, 500)
      }
    }
  },
  mounted () {
    this.getProducts()
    this.editModal = this.$refs.productModal
    this.delModel = this.$refs.delProductModal
  },
  components: { editProduct, deleteProduct, adminPagination }
}
</script>
