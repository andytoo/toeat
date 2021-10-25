<template>
    <div class="h-screen flex flex-col justify-between align-middle">
        <div class="mb-3">
            <img class="border w-full max-h-96 bg-center bg-cover" :src="URL + restaurant.id" alt="Image not found">
            <span class="block my-3 text-4xl text-center">{{ restaurant.name }}</span>
            <Category @total="updateTotal" :categories="restaurant.categoryList" :name="restaurant.name" />
        </div>
        <Total :total="total"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Category from '@/components/Category.vue'
import Total from '@/components/Total.vue'

export default {
    components: { Category, Total },
    data() { 
        return {
            URL: process.env.VUE_APP_IMAGE_SERVICE_URI,
            total: 0
        }
    },
    async created() {
        this.findRestaurantById(this.$route.params.id)
    },
    methods: {
        ...mapActions(['findRestaurantById']),
        updateTotal(total) {
            this.total = total
        }
    },
    computed: {
        ...mapGetters(['restaurant'])
    },
}
</script>