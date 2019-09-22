<template>
    <div class="article">
        <ul class="article-list">
            <li v-for="item in articleList" :key="item._id">
                <div class="text" @click="handleClick(item)">
                    <h3>{{item.Title}}</h3>
                    <p>{{item.Description}}</p>
                </div>
                <div class="img">
                    <img :src="item.ArticleImg" alt="个人博客从简不繁" :title="item.Title">
                </div>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :page-size="10"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getArticleList} from "../../service";
    import {Message} from "element-ui";

    export default {
        name: "articleList",
        data() {
            return {
                currentPage: 1,
                articleList: [],
                total: 0,
            }
        },
        mounted(){
            this._getArticleList();
        },
        methods: {
            handleClick(article) {
                this.$router.push({name: 'ArticleDetail'});
                localStorage.setItem('articleId', article['_id']);
                localStorage.setItem('userId', article['UserId']);
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
            },
        }
    }
</script>

<style scoped lang="less">
    .article{
        .article-list {
            li {
                background: #ffffff;
                padding: 15px;
                overflow: hidden;
                margin-bottom: 20px;
                color: #797b7c;
                display: flex;

                .text {
                    flex: 1;

                    h3 {
                        font-size: 16px;
                        line-height: 25px;
                        text-shadow: #FFF 1px 1px 1px;
                        color: #222222;
                        cursor: pointer;
                    }

                    p {
                        margin: 20px 0 0 0;
                        line-height: 22px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                    }
                }

                .img {
                    width: 150px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        cursor: pointer;
                        transition: all .5s ease;

                        &:hover {
                            transform: scale(1.05);
                        }
                    }
                }
            }
        }
        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

</style>
