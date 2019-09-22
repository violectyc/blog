<template>
    <div class="article">
        <Layout>
            <template v-slot:right>
                <Search @keyword="handleSearch"/>
                <Category/>
                <Recommend :list="recommendArticle"/>
                <Tags/>
            </template>
            <template v-slot:left>
                <router-view/>
            </template>
        </Layout>
    </div>
</template>

<script>
    import Search from '@/components/search'
    import Category from '@/components/category'
    import Recommend from '@/components/recommend'
    import Layout from '@/components/layout'
    import Tags from '@/components/tags'
    import ArticleList from '@/components/article-list'
    import {getArticleList} from "../service";
    import {Message} from "element-ui";
    import {mapState} from "vuex";

    export default {
        name: "Article",
        data() {
            return {
                articleList: []
            }
        },
        components: {
            Layout, Tags, ArticleList,Search,Category,Recommend
        },
        computed: {
            ...mapState({
                recommendArticle:'recommendArticle'
            })
        },
        mounted(){
            this._getArticleList();
        },
        methods: {
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
            }
        }
    }
</script>

<style scoped lang="less">
    .article {
        position: relative;
    }
</style>
