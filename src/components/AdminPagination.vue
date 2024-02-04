<template>
  <nav aria-label="Page navigation example" v-if="pages.total_pages">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="emitPage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        :class="{ active: item === pages.current_page }"
        v-for="(item, key) in pages.total_pages"
        :key="key"
      >
        <a class="page-link" v-if="item === pages.current_page">
          {{ item }}
        </a>
        <a class="page-link" href="#" v-else @click.prevent="emitPage(item)">
          {{ item }}
        </a>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pages.current_page === pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="emitPage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    emitPage (item) {
      this.$emit('emit-page', item)
    }
  },
  props: ['pages']
}
</script>
