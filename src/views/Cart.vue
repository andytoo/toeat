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
import TokenService from '@/services/TokenService'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let socket = null

export default {
    components: { Order },
    data() {
        return {
            isSent: true,
        }
    },
    async created() {
        socket = new SockJS(`${process.env.VUE_APP_API_URL}/ws`)
        const client = Stomp.over(socket)
        client.connect({}, frame => {
            client.subscribe(`/topic/order/${TokenService.getPhone()}`, payload => {
                const data = JSON.parse(payload.body)
                this.updateOrder(data)
            })
        })

        this.setLoading(true)
        const resp = await OrderService.getOrders(this.user.phone)
        let orders = []
        for (let i = 0; i < resp.data.length; i++) {
            const order = { id: resp.data[i].orderid, 
                            restaurantId: resp.data[i].restaurantid,
                            restaurantName: resp.data[i].restaurantname,
                            phone: resp.data[i].phone,
                            status: resp.data[i].status,
                            itemList: JSON.parse(resp.data[i].itemlist.value),
                            total: resp.data[i].total }
            orders.push(order)
        }
        this.updateCart(orders)
        this.setLoading(false)
    },
    unmounted(){
        socket.close();
    },
    methods: {
       ...mapActions(['updateCart', 'setLoading', 'updateOrder'])
    },
    computed: {
        ...mapGetters(['user', 'cart', 'pendingCart'])
    }
}
</script>