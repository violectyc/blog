<template>
    <div class="article-detail">
        <h3 class="article-title">{{article.Title}}</h3>
        <div class="info">
            <span>{{article.NickName}}</span>
            <span>{{article.Created | toFormate}}</span>
            <span>{{article.ReadCount}}人已阅读</span>
        </div>
        <div class="about">
            <strong>简介</strong>
            {{article.Description}}
        </div>

        <div class="content" v-html="article.Content"></div>
        <div class="tags">

            <span v-for="item in article.ArticleType">{{item}}</span>
        </div>
        <div class="share">
            <p class="diggit">
                <a href="javascript:;" @click="_updateThumbCount"> 很赞哦！ </a>
                <b>(&nbsp;{{article.ThumbsUp}}&nbsp;)</b>
            </p>
        </div>
        <div class="comments">
            <h2>文章评论</h2>
            <CommentsList :list="commentsList"/>
            <PutMessage @putMessage="handleClick"/>
        </div>
    </div>
</template>

<script>
    import PutMessage from '@/components/put-message'
    import CommentsList from '@/components/comments-list'
    import {formate} from '@/common/filter'
    import {getArticleDetail, updateReadCount, updateThumbCount, putComments, getComments} from '@/service'
    import {Message} from 'element-ui'

    export default {
        name: "article-detail",
        data() {
            return {
                article: {},
                _id: '', //文章id
                UserId: '',
                time: 15,
                timer: null,
                commentsList: []
            }
        },
        components: {
            PutMessage, CommentsList
        },
        created() {
            this._id = localStorage.getItem('articleId');
            this.UserId = localStorage.getItem('UserId');
        }, mounted() {

            this._getDetail();
            this._countDown();
            this._getComments();
        },
        filters: {
            toFormate(time) {
                return formate(time)
            }
        },
        methods: {
            _getDetail() {
                getArticleDetail({_id: this._id, UserId: this.UserId}).then(res => {
                    const {err_code, data, nick} = res.data;
                    if (err_code * 1 === 0) {
                        this.article = Object.assign({}, data, nick);

                    }
                })
            },
            _countDown() {
                this.timer = setInterval(this.countDown, 1000);
            },
            countDown() {
                this.time--;
                if (this.time <= 0) {
                    clearInterval(this.timer);
                    this._updateReadCount();
                }
            },
            _updateReadCount() {
                updateReadCount({_id: this._id}).then(res => {
                    const {err_code, message} = res.data;
                    if (err_code * 1 !== 0) {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                });
            },
            _updateThumbCount() {
                updateThumbCount({_id: this._id}).then(res => {
                    this.article['ThumbsUp'] = res.data.data.ThumbsUp;
                });
            },
            handleClick(form) {
                const result = Object.assign({}, form, {ArticleId: this._id});
                putComments(result).then(res => {
                    const {err_code, message} = res.data;
                    if (err_code * 1 === 0) {
                        this._getComments();
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                });
            },
            _getComments() {
                getComments({ArticleId: this._id}).then(res => {
                    const {err_code, data, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.commentsList = data;
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }

                });
            }

        }
    }
</script>

<style lang="less" scoped>
    .article-detail {
        background: #ffffff;
        padding: 0 30px;
        box-sizing: border-box;

        .article-title {
            font-size: 24px;
            font-weight: normal;
            padding: 20px 0;
            color: #333;
        }

        .info {
            span {
                padding: 0 10px;
            }
        }

        .tags {
            padding: 20px 0;

            span {
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

        .share {
            padding: 20px;

            p {
                width: 160px;
                margin: auto;
                background: #E2523A;
                color: #fff;
                box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, .2);
                border-radius: 3px;
                line-height: 40px;
                text-align: center;

                a {
                    text-decoration: none;
                    color: #ffffff;
                }
            }
        }

        .comments {
            margin: 10px 0 20px 0;
            width: 100%;
            padding-bottom: 50px;
            overflow: hidden;

            h2 {
                border-bottom: #000 2px solid;
                line-height: 40px;
                font-size: 14px;
                padding-left: 10px;
                color: #000;
            }
        }
    }
</style>
