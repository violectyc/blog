<template>
    <div class="home">
        <Layout>
            <template v-slot:right>
                <About v-if="userInfo"/>
                <Gallery :list="recommendGallery" @toGalleyDetail="handleGalleryDetail"/>
                <Search @keyword="handleSearch"/>
                <Category/>
                <Recommend :list="recommend"/>
            </template>
            <template v-slot:left>
                <router-view/>
                <ArticleList :list="articleList" @handleDetail="toArticleDetail"/>
                <div class="pagination">
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            layout="prev, pager, next"
                            :page-size="5"
                            :total="total">
                    </el-pagination>
                </div>
            </template>
        </Layout>
    </div>
</template>
<script>
    import Layout from '@/components/layout'
    import About from '@/components/about'
    import ArticleList from '@/components/article-list'
    import Search from '@/components/search'
    import Category from '@/components/category'
    import Recommend from '@/components/recommend'
    import Gallery from '@/components/gallery'
    import {current, getArticleList, getRecommend, getRecommendGallery} from '@/service'
    import {Message} from 'element-ui'
    import {mapState} from "vuex";
    import {getSearch} from "../service";

    export default {
        name: 'home',
        data() {
            return {
                articleList: [],
                total: 0,
                currentPage: 1,
                keyWord: '',
                isSearch: false,
                recommend: [],
                recommendGallery: []
            }
        },
        mounted() {
            this._getArticleList();
            this._getRecommend();
            this._getRecommendGallery();
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        components: {
            Layout,
            About,
            ArticleList,
            Search,
            Category,
            Recommend,
            Gallery
        },
        methods: {
            _getCurrent() {
                current().then(res => {
                    if (res.data.err_code * 1 == 0) {
                        this.$store.commit('setUser', res.data.data);
                        localStorage.setItem('userInfo', JSON.stringify(res.data.data));

                    }
                })
            },
            _getArticleList() {
                getArticleList({currentPage: this.currentPage}).then(res => {

                    const {err_code, message, data, total} = res.data;
                    if (err_code * 1 === 0) {
                        this.articleList = data;
                        this.total = total;
                    } else {
                        Message({
                            type: 'success',
                            message: message
                        });
                    }
                });
            },
            handleCurrentChange(curPage) {
                this.currentPage = curPage;
                this._getArticleList();
                // if (this.isSearch) {
                //
                // } else {
                //     this._getSearch();
                // }
            },
            toArticleDetail(article) {
                this.$router.push({name: 'ArticleDetail'});
                localStorage.setItem('articleId', article['_id']);
                localStorage.setItem('userId', article['UserId']);
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
                        this.recommend = data;
                    }
                })
            },
            _getRecommendGallery() {
                getRecommendGallery().then(res => {
                    console.log(res);
                    const {err_code, data, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.recommendGallery = data;
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                })
            },
            handleGalleryDetail(gallery) {
                localStorage.setItem('gallery', JSON.stringify(gallery));
                this.$router.push({name: 'GalleryDetail'});
            }
        }
    }
</script>
<style lang="less" scoped>
    .home {
        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
