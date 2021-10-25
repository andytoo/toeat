<template>
    <router-link :to="{ name: 'Menu', params: { id: restaurant.id } }">
        <div class="grid-container">
            <img class="border w-full h-44 sm:h-52 object-cover" :src="URL + restaurant.id" alt="Image not found">
            <div class="ml-3">
                <div class="my-1">
                    <span class="text-2xl font-medium text-gray-700">{{ restaurant.name }}</span>
                </div>
                <div>
                    <span class="text-sm text-gray-400">{{ restaurant.info }}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: { restaurant: Object },
    data() {
        return {
            URL: process.env.VUE_APP_IMAGE_SERVICE_URI
        }
    }
}
</script>