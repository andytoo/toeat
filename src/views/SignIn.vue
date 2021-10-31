<template>
    <Panel :title="title">
        <template v-slot:input-field>
            <input @keyup.enter="doSignIn()" class="input-form" placeholder="Phone" maxlength="10" type="text" name="phone" v-model="phone">
            <input @keyup.enter="doSignIn()" class="input-form" placeholder="Password" type="password" name="password" v-model="password">
            <button class="form-submit-button" @click="doSignIn()">{{ title }}</button>
            <div class="mt-3">
                <span>Not a member yet? <span class="text-blue-300" @click="this.$router.push({ name: 'SignUp' })">Sign Up</span></span>
            </div>
        </template>
    </Panel>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AuthService from '@/services/AuthService'
import Panel from '@/components/Panel.vue'

export default {
    components: { Panel },
    data() {
        return {
            title: "Sign In",
            phone: null,
            password: null
        }
    },
    computed: {
        ...mapGetters(['isUserSignedIn'])
    },
    methods: {
        ...mapActions(['setLoading', 'setMsg']),
        async doSignIn() {
            this.setLoading(true)
            
            //TODO VALIDATION
            try {
                const resp = await AuthService.signIn({ phone: this.phone, password: this.password })

                this.setMsg("Signed In")
            } catch (err) {
                this.setMsg(err.response.data.message)

                // if (err.response.status === 401) {
                //     this.signOut()
                //     // location.reload(true)
                // }
            }

            this.setLoading(false)
            if (this.isUserSignedIn) {
                this.$router.push({ name: 'Home' })
            }
        }
    }
}
</script>