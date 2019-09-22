<template>
        <div class="slide">
            <!-- swiper1 -->
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
                <swiper-slide class="slide-1"  v-for="item of list" :key="item">
                    <img :src="item" alt="">
                </swiper-slide>
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                <swiper-slide class="slide-1" v-for="item of list" :key="item">
                    <img :src="item"  alt="">
                </swiper-slide>
            </swiper>
        </div>
</template>

<script>
    export default {
        name: "GallerySwiper",
        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                swiperOptionTop: {
                    spaceBetween: 10,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
                swiperOptionThumbs: {
                    spaceBetween: 10,
                    slidesPerView: 4,
                    touchRatio: 0.2,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same
                    slideToClickedSlide: true,
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.swiper;
                const swiperThumbs = this.$refs.swiperThumbs.swiper;
                swiperTop.controller.control = swiperThumbs;
                swiperThumbs.controller.control = swiperTop;
            })
        }
    }
</script>
<style scoped lang="less">
.slide{
    width: 100%;
    overflow: hidden;
    .gallery-top{
        height: 80%!important;
        width: 100%;
        img{
            width: 100%;
        }
    }
    .gallery-thumbs{
        height: 20%!important;
        box-sizing: border-box;
        padding: 10px 0;
        .slide-1{
            width: 25%;
            height: 100%;
            opacity: 0.4;
            img{
                width: 100%;
            }
        }
        .swiper-slide-active{
            opacity: 1;
        }
    }
}
</style>
