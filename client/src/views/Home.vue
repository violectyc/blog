<template>
    <div class="home">
        <Layout>
            <template v-slot:right>
                <About v-if="userInfo"/>
                <Search @keyword="handleSearch"/>
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
    import {current, getArticleList} from '@/service'
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
                isSearch: false
            }
        },
        mounted() {
            this._getArticleList();
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        components: {
            Layout,
            About,
            ArticleList, Search
        },
        methods: {
            _getCurrent() {
                current().then(res => {
                    console.log('home');
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

                if (this.isSearch) {
                    this._getArticleList();
                } else {
                    this._getSearch();
                }
            },
            toArticleDetail(article) {

                this.$router.push({name: 'ArticleDetail', params: {article}})
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
