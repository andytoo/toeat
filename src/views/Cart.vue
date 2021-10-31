<template>
    <div class="my-5">
        <h1 class="text-5xl text-center">Cart</h1>
        <div class="flex justify-around text-2xl">
            <span class="block px-3 mt-3 cursor-pointer" @click="isSent=true"
            :class="{ 'border-b-2' : isSent}">
                Sent
            </span>
            <span class="block px-3 mt-3 cursor-pointer" @click="isSent=false"
            :class="{ 'border-b-2' : !isSent}">
                Pending
            </span>
        </div>
        
        <div v-if="isSent">
            <div class="grid-layout" >
                <Order v-for="order in cart" :key="order.id" :order="order" />
            </div>
        </div>
        <div v-if="!isSent">
            <div class="grid-layout" >
                <Order v-for="order in pendingCart" :key="order.id" :order="order" />
            </div>
        </div>
    </div>
</template>

<script>
import Order from '@/components/Order.vue'

import { mapGetters, mapActions } from 'vuex'

import OrderService from '@/services/OrderService'

export default {
    components: { Order },
    async created() {
        this.setLoading(true)

        const resp = await OrderService.getOrders(this.user.phone)

        let orders = []

        for (let i = 0; i < resp.data.length; i++) {
            const order = { orderId: resp.data[i].orderid, 
                            restaurantId: resp.data[i].restaurantid,
                            restaurantName: resp.data[i].restaurantname,
                            phone: resp.data[i].phone,
                            itemList: JSON.parse(resp.data[i].itemlist.value),
                            total: resp.data[i].total }
            orders.push(order)
        }

        this.updateCart(orders)

        this.setLoading(false)
    },
    data() {
        return {
            isSent: true
        }
    },
    methods: {
       ...mapActions(['updateCart', 'setLoading'])
    },
    computed: {
        ...mapGetters(['user', 'cart', 'pendingCart'])
    }
}
</script>