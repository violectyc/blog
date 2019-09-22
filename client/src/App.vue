<template>
    <div id="app">
        <nav-menu></nav-menu>
        <transition name="fade"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut"
        >
            <router-view/>
        </transition>
        <Footer/>
    </div>
</template>
<script>
    import NavMenu from '@/components/nav-menu'
    import Footer from '@/components/footer'

    export default {
        name: 'app',
        components: {
            NavMenu, Footer
        }
    }
</script>
<style scoped lang="less">
    /*.fade-enter,.fade-leave-to {*/
    /*    opacity: 0;*/
    /*}*/
    /*.fade-enter-active ,.fade-leave-active {*/
    /*    transition: opacity .1s;*/
    /*}*/
</style>
