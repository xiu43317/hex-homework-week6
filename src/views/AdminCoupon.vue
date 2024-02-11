<template>
  <myLoading :active="isLoading"></myLoading>
  <div class="h3 mt-4 text-center">優惠卷新增頁面</div>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的優惠卷
      </button>
      <!-- 新增優惠卷Modal -->
      <coupon-modal ref="couponModal"
      @update="updateCoupon"
      :isNew="isNew"
      :coupon="tempCoupon"></coupon-modal>
      <!-- 刪除優惠券Modal -->
      <CouponDelModal ref="delCouponModal"
      @deleteCoupon="deleteCoupon"
      :coupon="tempCoupon"></CouponDelModal>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>折扣碼</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.formatDate }}
          </td>
          <td>{{ item.code }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit',item)"
              >
                  編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete',item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import CouponModal from '../components/CouponModal.vue'
import CouponDelModal from '../components/CouponDelModal.vue'
const url = import.meta.env.VITE_APP_API_URL
const path = import.meta.env.VITE_APP_API_NAME
export default {
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isLoading: false,
      isNew: false,
      emptyCoupon: {
        title: '',
        is_enabled: 0,
        code: '',
        due_date: new Date() / 1000,
        percent: '',
        id: ''
      }
    }
  },
  components: { CouponModal, CouponDelModal },
  methods: {
    openModal (status, coupon = {}) {
      if (status === 'new') {
        this.isNew = true
        this.tempCoupon = { ...this.emptyCoupon }
        this.$refs.couponModal.openModal()
      } else if (status === 'delete') {
        this.isNew = false
        this.tempCoupon = coupon
        this.$refs.delCouponModal.openModal()
      } else if (status === 'edit') {
        this.isNew = false
        this.tempCoupon = { ...coupon }
        this.$refs.couponModal.openModal()
      }
    },
    closeModal () {
      this.$refs.couponModal.closeModal()
      this.$refs.delCouponModal.closeModal()
    },
    getCoupons () {
      this.isLoading = true
      this.$http.get(`${url}/api/${path}/admin/coupons`)
        .then((res) => {
          this.coupons = [...res.data.coupons]
          this.coupons.forEach((item) => {
            const date = new Date(item.due_date * 1000).toISOString().split('T')[0]
            item.formatDate = date
          })
          // console.log(this.coupons)
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    deleteCoupon (id) {
      this.$http.delete(`${url}/api/${path}/admin/coupon/${id}`)
        .then((res) => {
          console.log(res)
          alert(res.data.message)
          this.$refs.delCouponModal.closeModal()
          this.getCoupons()
        }).catch((err) => {
          alert(err.message)
          this.$refs.delCouponModal.closeModal()
        })
    },
    updateCoupon (coupon) {
      // console.log(coupon)
      const newCoupon = {
        title: coupon.title,
        is_enabled: coupon.is_enabled,
        percent: coupon.percent,
        due_date: coupon.due_date / 1000,
        code: coupon.code
      }
      if (this.isNew) {
        this.$http.post(`${url}/api/${path}/admin/coupon`, { data: newCoupon })
          .then((res) => {
            // console.log(res)
            alert(res.data.message)
            this.closeModal()
            this.getCoupons()
          })
          .catch((err) => {
            console.log(err)
            alert(err.response.data.message)
          })
      } else {
        this.$http.put(`${url}/api/${path}/admin/coupon/${coupon.id}`, { data: newCoupon })
          .then((res) => {
            // console.log(res)
            alert(res.data.message)
            this.closeModal()
            this.getCoupons()
          })
          .catch((err) => {
            // console.log(err)
            alert(err.data.message)
          })
      }
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
