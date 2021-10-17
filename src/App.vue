<template>
  <PageLoader />
  <Header />
  <PopUp />
  <router-view/>
</template>

<script>
import PageLoader from '@/components/PageLoader.vue'
import PopUp from '@/components/PopUp.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    PageLoader,
    PopUp,
    Header
  }
}
</script>

<style lang="postcss">
  .grid-layout {
    @apply mx-2 my-4 sm:mx-3 md:mx-4 grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  }
  .grid-container {
    @apply border rounded-md overflow-hidden shadow-md
  }
</style>
