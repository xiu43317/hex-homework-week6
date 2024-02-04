<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ product.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal()"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteProduct()">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'
const url = import.meta.VITE_APP_API_URL
const path = import.meta.VITE_APP_API_NAME
export default {
  data () {
    return {
      delModal: ''
    }
  },
  props: ['product'],
  methods: {
    deleteProduct () {
      this.$http
        .delete(`${url}/api/${path}/admin/product/${this.product.id}`)
        .then((res) => {
          alert(res.data.message)
          this.hideModal()
          this.getProducts()
        })
        .catch((error) => {
          alert(error.response.data.message)
          this.hideModal()
        })
    },
    getProducts () {
      this.$emit('getProducts')
    },
    openModal () {
      this.delModal.show()
    },
    hideModal () {
      this.delModal.hide()
    }
  },
  mounted () {
    this.delModal = new Modal(document.querySelector('#delProductModal'))
  }
}
</script>
