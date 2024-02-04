<template>
  <div
    id="productModal"
    ref="Modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <h3 class="mb-3">主要圖片</h3>
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="product.imageUrl"
                  />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">上傳檔案</label>
                  <input class="form-control" type="file" id="formFile" ref="formFile" @change="uploadFile()"/>
                </div>
                <img class="img-fluid" :src="product.imageUrl" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(product.imagesUrl)">
                <template
                  v-for="(image, key) in product.imagesUrl"
                  :key="key"
                >
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label"
                      >輸入圖片網址</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="product.imagesUrl[key]"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label">上傳檔案</label>
                    <input
                      class="form-control uploadImages"
                      type="file"
                      @change="uploadFiles(key)"
                    />
                    <img class="img-fluid" :src="product.imagesUrl[key]" />
                  </div>
                </template>
                <div
                  v-if="
                    !product.imagesUrl.length ||
                    product.imagesUrl[product.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="product.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="product.imagesUrl.pop()"
                  >
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages()"
                >
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="product.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="product.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="product.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="product.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="product.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="product.content"
                >
                </textarea>
              </div>
              <div class="mb-3 row">
                <div class="mb-3 col-md-6">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="product.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
                <div class="mb-3 col-md-6 row">
                  <label for="price" class="col-sm-3 col-form-label"
                    >推薦度</label
                  >
                  <div class="col-sm-5 mt-1">
                    <a
                      href="#"
                      v-for="(item, key) in 5"
                      :key="key"
                      @click.prevent="product.stars = key + 1"
                    >
                      <span v-if="key + 1 <= tempProduct.stars">
                        <font-awesome-icon :icon="['fas', 'star']" />
                      </span>
                      <span v-else>
                        <font-awesome-icon :icon="['far', 'star']" />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="hideModal()"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="updateProduct()"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'
const url = import.meta.env.VITE_APP_API_URL
const path = import.meta.env.VITE_APP_API_NAME
export default {
  data () {
    return {
      product: {},
      new: false
    }
  },
  props: ['isNew', 'tempProduct'],
  methods: {
    updateProduct () {
      if (this.isNew) {
        this.$http
          .post(`${url}/api/${path}/admin/product`, { data: this.tempProduct })
          .then((res) => {
            alert(res.data.message)
            this.getProducts()
            this.hideModal()
          })
          .catch((error) => {
            alert(error.response.data.message)
            this.hideModal()
          })
      } else {
        this.$http
          .put(`${url}/api/${path}/admin/product/${this.tempProduct.id}`, {
            data: this.tempProduct
          })
          .then((res) => {
            alert(res.data.message)
            this.getProducts()
            this.hideModal()
          })
          .catch((error) => {
            alert(error.response.data.message)
            // this.hideModal();
          })
      }
    },
    createImages () {
      this.Product.imagesUrl = []
      this.Product.imagesUrl.push('')
    },
    getProducts () {
      this.$emit('getProducts')
    },
    openModal () {
      this.product = this.tempProduct
      this.myModal.show()
    },
    hideModal () {
      this.myModal.hide()
    },
    uploadFile () {
      // console.dir(fileInput)
      const file = this.fileInput.files[0]
      // console.log(file)
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http
        .post(`${url}/api/${path}/admin/upload`, formData)
        .then((res) => {
          // console.log(res.data.imageUrl)
          this.Product.imageUrl = res.data.imageUrl
        })
        .catch((err) => {
          // console.dir(err)
          alert(err.response.data.message)
        })
    },
    uploadFiles (key) {
      const multiImgs = document.querySelectorAll('.uploadImages')
      // console.log(multiImgs[key].files)
      const file = multiImgs[key].files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.$http
        .post(`${url}/api/${path}/admin/upload`, formData)
        .then((res) => {
          this.Product.imagesUrl[key] = res.data.imageUrl
        })
        .catch((err) => {
          // console.dir(err)
          alert(err.response.data.message)
        })
    }
  },
  watch: {
    isNew () {
      // console.log('1')
      this.new = this.isNew
    }
  },
  mounted () {
    // this.product = { ...this.tempProduct }
    // this.new = this.isNew
    this.myModal = new Modal(this.$refs.Modal, {
      keyboard: false
    })
    // this.fileInput = this.$refs.formFile
    // this.fileInput.addEventListener('change', this.uploadFile)
  }
}
</script>
