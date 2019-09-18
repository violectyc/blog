<template>
    <div class="gallery-detail">
        <layout>
            <template v-slot:right>
                right
            </template>
            <template v-slot:left>
                <div class="picture">
                    <div class="piccontext">
                        <h2>{{gallery.Title}}</h2>
                    </div>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import Layout from '@/components/layout'

    export default {
        name: "galleryDetail",
        data() {
            return {
                gallery: {}
            }
        },
        components: {
            Layout
        },
        created() {
            this.gallery = localStorage.getItem('gallery') ? JSON.parse(localStorage.getItem('gallery')) : {};
        }
    }
</script>

<style scoped lang="less">
    .gallery-detail {
        .picture {
            width: 100%;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.8);
            padding-bottom: 20px;
            position: relative;
            margin-bottom: 20px;
            .piccontext{
                overflow: hidden;
                padding: 0 20px;
                h2{
                    margin: 20px 0;
                    font-size: 22px;
                    color: #222;
                }
            }
        }
    }

</style>
