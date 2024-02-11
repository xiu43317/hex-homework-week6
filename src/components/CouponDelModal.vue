<template>
  <div
    id="delCouponModal"
    ref="delCouponModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除優惠券</span>
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
          <strong class="text-danger">{{ coupon.title }}</strong>
          優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="closeModal()"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="deleteCoupon()">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'
export default {
  data () {
    return {
      myCoupon: {},
      delModal: ''
    }
  },
  props: ['coupon'],
  methods: {
    openModal () {
      this.delModal.show()
    },
    closeModal () {
      this.delModal.hide()
    },
    deleteCoupon () {
      this.$emit('deleteCoupon', this.coupon.id)
    }
  },
  mounted () {
    this.delModal = new Modal(this.$refs.delCouponModal)
  }
}
</script>
