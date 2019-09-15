<template>
    <div id="app">
        <nav-menu></nav-menu>
        <router-view/>
    </div>
</template>
<script>
    import NavMenu from '@/components/nav-menu'

    export default {
        name: 'app',
        components: {
            NavMenu
        }
    }
</script>
<style scoped lang="less">

</style>
