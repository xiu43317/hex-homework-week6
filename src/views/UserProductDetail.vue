<template>
    <div class="h3 mt-3 text-center">這是產品ID：{{id}}</div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
