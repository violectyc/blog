<template>
    <div class="home">
        <Layout>
            <template v-slot:right>
                <About v-if="userInfo"/>
                <Gallery :list="recommendGallery" @toGalleyDetail="handleGalleryDetail"/>
                <Search @keyword="handleSearch"/>
                <Category/>
                <Recommend :list="recommendArticle"/>
            </template>
            <template v-slot:left>
                <router-view/>
            </template>
        </Layout>
    </div>
</template>
<script>
    import Layout from '@/components/layout'
    import About from '@/components/about'
    import Search from '@/components/search'
    import Category from '@/components/category'
    import Recommend from '@/components/recommend'
    import Gallery from '@/components/gallery'
    import {current, getRecommend, getRecommendGallery} from '@/service'
    import {Message} from 'element-ui'
    import {mapState} from "vuex";
    import {getSearch} from "../service";

    export default {
        name: 'home',
        data() {
            return {
                keyWord: '',
                isSearch: false,
            }
        },
        mounted() {
            this._getRecommend();
            this._getRecommendGallery();
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo',
                recommendGallery: 'recommendGallery',
                recommendArticle:'recommendArticle'
            })
        },
        components: {
            Layout,
            About,
            Search,
            Category,
            Recommend,
            Gallery
        },
        methods: {
            _getCurrent() {
                current().then(res => {
                    if (res.data.err_code * 1 === 0) {
                        this.$store.commit('setUser', res.data.data);
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                    }
                })
            },
            handleSearch(key) {
                if (key === '') {
                    Message({
                        type: "warning",
                        message: '关键字不能为空'
                    })
                } else {
                    this.keyWord = key;
                    this._getSearch();
                }
            },
            _getSearch() {
                getSearch({keyWord: this.keyWord, currentPage: this.currentPage}).then(res => {
                    const {data, total, err_code} = res.data;
                    if (err_code * 1 === 0) {
                        this.total = total;
                        this.articleList = data;
                    }
                })
            },
            _getRecommend() {
                getRecommend().then(res => {
                    const {err_code, data} = res.data;
                    if (err_code * 1 === 0) {
                        this.$store.commit('setRecommendArticle', data);
                        localStorage.setItem('recommendArticle', JSON.stringify(data))
                    }
                })
            },
            _getRecommendGallery() {
                getRecommendGallery().then(res => {
                    console.log(res);
                    const {err_code, data, message} = res.data;
                    if (err_code * 1 === 0) {
                        // this.recommendGallery = data;
                        this.$store.commit('setRecommendGallery', data);
                        localStorage.setItem('recommendGallery', JSON.stringify(data))
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                })
            },
            handleGalleryDetail(gallery) {
                localStorage.setItem('galleryId', gallery['_id']);
                this.$router.push({name: 'GalleryDetail'});
            }
        }
    }
</script>
<style lang="less" scoped>
    .home {

    }
</style>
