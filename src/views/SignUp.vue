<template>
    <Panel :title="title">
        <template v-slot:input-field>
            <input @keyup.enter="doSignUp()" class="input-form" placeholder="Name" type="text" name="name" v-model="name">
            <input @keyup.enter="doSignUp()" class="input-form" placeholder="Phone" maxlength="10" type="text" name="phone" v-model="phone">
            <input @keyup.enter="doSignUp()" class="input-form" placeholder="Password" type="password" name="password" v-model="password">
            <input @keyup.enter="doSignUp()" class="input-form" placeholder="Confirm Password" type="password" name="password" v-model="confirm">
            <button class="form-submit-button" @click="doSignUp()">{{ title }}</button>
            <div class="mt-3">
                <span>already a member? <span class="text-blue-300" @click="this.$router.push({ name: 'SignIn' })">Sign In</span></span>
            </div>
        </template>
        {{user}}
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
            title: "Sign Up",
            name: null,
            phone: null,
            password: null,
            confirm: null
        }
    },
    computed: {
        ...mapGetters(['isUserSignedIn'])
    },
    methods: {
        ...mapActions(['setLoading', 'setMsg']),
        async doSignUp() {

            //TODO VALIDATION
            if (this.password != this.confirm) {
                alert("Password & Confirm Password does not match.")
                return
            }
            
            this.setLoading(true)

            try {
                const resp = await AuthService.signUp({ "phone": this.phone, "name": this.name, "password": this.password, "confirm": this.confirm })
                this.setMsg("Signed Up")
            } catch (err) {
                this.setMsg(err.response.data.message)
            }
            
            if (this.isUserSignedIn) {
                this.$router.push({ name: 'Cart' })
            }

            this.setLoading(false)
        }
    }
}
</script>