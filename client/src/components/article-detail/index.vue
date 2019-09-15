<template>
    <div class="article-detail">
        <h3 class="article-title">{{article.Title}}</h3>
        <div class="article-info"></div>
        <div class="tags" v-for="item in article.ArticleType">
            <span>{{item}}</span>
        </div>
        <div class="about">
            <strong>简介</strong>
            {{article.Description}}
        </div>
        <div class="content" v-html="article.Content"></div>
    </div>
</template>

<script>
    import {formate} from '@/common/filter'

    export default {
        name: "article-detail",
        data() {
            return {
                article: []
            }
        }, mounted() {
            this.article = this.$route.params.article;
            console.log(this.article);
        },
        filters: {
            toFormate(time) {
                return formate(time)
            }
        }
    }
</script>

<style lang="less" scoped>
    .article-detail {
        width: 1000px;
        max-width: 1000px;
        margin: 0 auto;
        background: #ffffff;
        padding: 0 30px;
        box-sizing: border-box;

        .article-title {
            font-size: 24px;
            font-weight: normal;
            padding: 20px 0;
            color: #333;
        }

        .article-info {

        }
        .tags{
            span{
                padding: 0 5px;
            }
        }
        .about {
            color: #888888;
            border: 1px solid #F3F3F3;
            padding: 10px;
            margin: 20px auto 15px auto;
            line-height: 23px;
            background: none repeat 0 0 #F6F6F6;
        }

        .content {
            width: 100%;
            overflow: hidden;

            & /deep/ p {
                img {
                    width: 100% !important;
                }
            }

        }
    }
</style>
