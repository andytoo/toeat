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
                <Order v-for="order in sentOrders" :key="order.id" :order="order" />
            </div>
        </div>
        <div v-if="!isSent">
            <div class="grid-layout" >
                <Order v-for="order in pendingOrders" :key="order.id" :order="order" />
            </div>
        </div>
        
    </div>
</template>

<script>
import Order from '@/components/Order.vue'

import { mapGetters } from 'vuex'

export default {
    components: { Order },
    created() {
        this.sentOrders = this.carts.filter(order => order.isSubmit == true)
        this.pendingOrders = this.carts.filter(order => order.isSubmit == false)
    },
    data() {
        return {
            isSent: true,
            sentOrders: [],
            pendingOrders: []
        }
    },
    methods: {
       
    },
    computed: {
        ...mapGetters(['carts'])
    }
}
</script>