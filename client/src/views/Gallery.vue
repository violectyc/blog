<template>
    <div class="gallery">
        <RouterView/>
    </div>
</template>

<script>


    export default {
        name: "Gallery",
        data() {
            return {}
        },
        components: {

        }
    }
</script>

<style scoped lang="less">
    .gallery {
        width: 1000px;
        max-width: 1000px;
        margin: 0 auto;
        height: 100%;
    }
</style>
