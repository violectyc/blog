<template>
    <div class="message-wrap">
        <layout>
            <template v-slot:right>
                <About v-if="userInfo"/>
                <Gallery :list="recommendGallery" @toGalleyDetail="handleGalleryDetail"/>
                <Search @keyword="handleSearch"/>
                <Category/>
                <Recommend :list="recommendArticle"/>
            </template>
            <template v-slot:left>
                <div class="message">
                    <CommentsList :list="list"/>
                    <div class="pagination">
                        <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :page-size="5"
                                :total="total">
                        </el-pagination>
                    </div>
                    <PutMessage @putMessage="handleClick"/>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import Layout from '@/components/layout'
    import PutMessage from '@/components/put-message'
    import CommentsList from '@/components/comments-list'
    import {putMessage, getMessage} from '@/service'
    import {Message} from 'element-ui'
    import {mapState} from "vuex";
    import About from '@/components/about'
    import Search from '@/components/search'
    import Category from '@/components/category'
    import Recommend from '@/components/recommend'
    import Gallery from '@/components/gallery'

    export default {
        name: "Message",
        data() {
            return {
                list: [],
                total: 0,
                currentPage: 1
            }
        },
        components: {
            Layout, PutMessage, CommentsList,About,Search,Category,Recommend,Gallery
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo',
                recommendGallery: 'recommendGallery',
                recommendArticle:'recommendArticle'
            })
        },
        mounted() {
            this._getMessage();
        },
        methods: {
            handleClick(form) {
                putMessage(form).then(res => {

                    this._getMessage();
                    if (res.data.err_code*1 !== 0) {
                        Message({
                            type: 'error',
                            message: res.data.message,
                        });
                    }
                })
            },
            _getMessage() {
                getMessage({currentPage: this.currentPage}).then(res => {
                    this.total = res.data.total;
                    if (res.data.err_code*1 === 0) {
                        this.list = res.data.data;
                    } else {
                        Message({
                            type: 'error',
                            message: res.data.message,
                        });
                    }
                })
            },
            reset() {
                this.UserName = '';
                this.Email = '';
                this.Content = '';
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this._getMessage();
            }
        }
    }
</script>

<style scoped lang="less">
    .message-wrap {
        .message {
            width: 100%;
            background: #ffffff;
            margin-top: -20px;
            .pagination {

                display: flex;
                align-items: center;
                justify-content: center;

            }
        }
    }
</style>
