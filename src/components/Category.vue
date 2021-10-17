<template>
    <div class="block mx-3" v-for="category in categories" :key="category.id">
        <div class="border-b-2">
            <span class="block text-2xl mb-2">{{ category.name }}</span>
        </div>
        <div class="flex justify-between items-center my-1" v-for="menu in category.menuList" :key="menu.id">
            <div >
                <span class="block">{{ menu.name }}</span>
                <span class="block">$ {{ menu.price }}</span>
            </div>
            <div>
                <button class="bg-gray-100 border-0 rounded-lg py-0.5 px-2" @click="decrement(menu)">-</button>
                <span class="mx-3" :ref="menu.id">{{ getQuantity(menu.id) }}</span>
                <button class="bg-gray-100 border-0 rounded-lg py-0.5 px-2" @click="increment(menu)">+</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() { return { order: null } },
    props: ['categories', 'name'],
    emits: ['total'],
    created() { this.updateData() },
    methods: {
        updateData() {
            this.order = this.getOrderByRestaurantId(this.$route.params.id)
            if (this.order) {
                this.$emit('total', this.order.total)
            }
        },
        decrement(menu) {
            if (parseInt(this.$refs[menu.id].innerHTML) != 0) {
                this.$refs[menu.id].innerHTML = parseInt(this.$refs[menu.id].innerHTML) - 1
                this.updateOrder()
            }
        },
        increment(menu) {
            this.$refs[menu.id].innerHTML = parseInt(this.$refs[menu.id].innerHTML) + 1
            this.updateOrder()
        },
        updateOrder() {
            this.$store.dispatch('addOrderToCart', { refs: this.$refs, id: this.$route.params.id, name: this.name })
            this.updateData()
        },
        getQuantity(menuId) {
            if (this.order) {
                if (!this.order.isSubmit) {
                    let menu = this.order.itemList.find(({ id }) =>  id == menuId )
                    return (menu) ?  menu.quantity : 0
                } else {
                    return 0
                }
            } else {
                return 0
            }
        }
    },
    computed: { ...mapGetters(['getOrderByRestaurantId']) }
}
</script>