<template>
    <div class="login">
        <h2>Please log in...</h2>
        <Userlogin/>
    </div>
</template>

<script>

    import Userlogin from '@/components/UserLogin.vue'

    export default {
        name: "login",
        components: { Userlogin }
    }
</script>

<style scoped>

</style>