<template>
    <div class="sticky top-0 w-full z-30">
        <div class="navbar">
            <router-link :to="{ name: 'Home'}">
                <span class="text-2xl">TOEAT</span>
            </router-link>
            <span @click="toggleSidebar" class="text-2xl md:hidden"><i class="fas fa-bars"/></span>
            <div class="hidden md:block">
                <router-link class="navbar-menu" :to="{ name: 'Home' }"><i class="fas fa-home"/> Home</router-link>
                <router-link class="navbar-menu" :to="{ name: 'Cart' }"><i class="fas fa-shopping-cart"/> Cart</router-link>
                <router-link class="navbar-menu" v-if="!isUserSignedIn" :to="{ name: 'SignIn' }"><i class="fas fa-sign-in-alt" /> Sign In</router-link>
                <button class="navbar-menu" v-if="isUserSignedIn" @click="signOut"><i class="fas fa-sign-out-alt" /> Sign Out</button>
                <!-- <router-link class="navbar-menu" :to="{ name: 'About' }"><i class="fas fa-address-book"/> About</router-link> -->
            </div>
        </div>
    </div>
    <div class="sidebar sidebar-close"
        :class="{ 'sidebar-open' : !sidebar}">
        <span @click="toggleSidebar" class="block text-4xl pt-5 px-3"><i class="fas fa-times" /></span>
        <router-link class="sidebar-menu" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="sidebar-menu" :to="{ name: 'Cart' }">Cart</router-link>
        <router-link class="sidebar-menu" v-if="!isUserSignedIn" :to="{ name: 'SignIn' }">Sign In</router-link>
        <router-link class="sidebar-menu" v-if="!isUserSignedIn" :to="{ name: 'SignIn' }">Sign Out</router-link>
        <button class="sidebar-menu mx-auto" v-if="isUserSignedIn" @click="signOut">Sign Out</button>
        <!-- <router-link class="sidebar-menu" :to="{ name: 'About' }">About</router-link> -->
    </div>
    <div class="right-0" :class="{ 'fixed top-0 right-1/2 bottom-0 left-0 bg-black bg-opacity-50 z-40 left-slide-transition' : sidebar }" @click="toggleSidebar"> </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AuthService from '@/services/AuthService'

export default {
    data() { return { sidebar: false } },
    methods: { 
        toggleSidebar() { this.sidebar = !this.sidebar },
        signOut() {
            AuthService.signOut()
            this.$router.push({ name: 'SignIn' })
        }
    },
    computed: {
        ...mapGetters(['isUserSignedIn'])
    }
}
</script>

<style lang="postcss" scoped>
    .left-slide-transition {
        transition: right 0.5s ease
    }
    .navbar {
        @apply py-4 px-3 md:px-5  bg-gray-50 text-gray-700 flex justify-between items-center
    }
    .navbar-menu {
        @apply mx-1 p-2
    }
    .navbar-menu.router-link-active.router-link-exact-active {
        @apply border-b-4 border-gray-600 font-bold
    }
    .sidebar {
        @apply bg-gray-200 w-1/2 fixed top-0 bottom-0 text-right  z-50 left-slide-transition
    }
    .sidebar-close {
        @apply right-0
    }
    .sidebar-open {
        @apply -right-1/2
    }
    .sidebar-menu {
        @apply block text-center text-2xl py-2 px-5
    }
    .sidebar-menu.router-link-active.router-link-exact-active {
        @apply border-l-8 border-gray-700
    }
</style>