<template>
  <div class="grid-layout">
    <Restaurant v-for="restaurant in restaurants" :key="restaurant.id" :restaurant="restaurant" />
  </div>

  <div class="my-1 md:my-5 lg:my-10 text-center">
    <button class="btn" @click="goToPage(1)"><i class="fas fa-angle-double-left"/></button>
    <button class="btn" @click="goToPage(page - 1)"><i class="fas fa-chevron-left"/></button>
    {{ page }} / {{ lastPage }}
    <button class="btn" @click="goToPage(page + 1)"><i class="fas fa-angle-right"/></button>
    <button class="btn" @click="goToPage(lastPage)"><i class="fas fa-angle-double-right"/></button>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Restaurant from '@/components/Restaurant.vue'

import RestaurantService from '@/services/RestaurantService'

export default {
  name: 'Home',
  components: { Restaurant },
  async created() {
    if (this.restaurants.length == 0) {
      this.setLoading(true)
      try {
        let resp = await RestaurantService.getRestaurants(1)
        this.setRestaurant(resp.data)
      } catch (err) {
        this.setMsg(err.response.data.message)
      }
      this.setLoading(false)
    }
  },
  methods: {
    ...mapActions([
      'setMsg',
      'setLoading',
			'goToPage',
      'setRestaurant'
		])
  },
  computed: {
    ...mapGetters([
			'page',
      'lastPage',
      'restaurants'
		])
  },
}
</script>

<style lang="postcss" scoped>
  .btn {
    @apply px-2 py-1 m-1 bg-gray-100 rounded
  }
</style>