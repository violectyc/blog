<template>
    <div class="gallery-detail">
        <layout>
            <template v-slot:right>
                right
            </template>
            <template v-slot:left>
                <div class="picture" ref="picture">
                    <div class="piccontext">
                        <h2 class="title">{{gallery.Title}}</h2>
                        <div class="source">
                            <div class="source_left">
                                <span>{{gallery.UserName}}</span>
                                <span>{{gallery.Created | toFormate}}</span>
                                <span>{{gallery.ReadCount}}人已阅读</span>
                            </div>
                        </div>
                        <div class="picshow" ref="picshow">
                            <gallery-swiper :list="gallery.ImgList"/>
                        </div>
                        <p class="pictext">{{gallery.Description}}</p>
                        <div class="share">
                            <p class="diggit">
                                <a href="javascript:;" @click="_updateThumbCount"> 很赞哦！ </a>
                                <b>(&nbsp;{{gallery.ThumbsUp}}&nbsp;)</b>
                            </p>
                        </div>
                        <div class="comments">
                            <h2>相册评论</h2>
                            <CommentsList :list="commentsList"/>
                            <PutMessage @putMessage="handleClick"/>
                        </div>
                    </div>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import Layout from '@/components/layout'
    import PutMessage from '@/components/put-message'
    import CommentsList from '@/components/comments-list'
    import {formate} from '@/common/filter'
    import GallerySwiper from '@/components/gallery-swiper'
    import {updateGalleryThumb, galleryDetail} from '@/service'
    import {Message} from "element-ui";
    import {getComments, putComments} from "../../service";

    export default {
        name: "galleryDetail",
        data() {
            return {
                gallery: {},
                id: '',
                commentsList: []
            }
        },
        components: {
            Layout, GallerySwiper, PutMessage, CommentsList
        },
        filters: {
            toFormate(time) {
                return formate(time);
            }
        },
        created() {
            this.id = localStorage.getItem('galleryId') ? localStorage.getItem('galleryId') : '';

        }, mounted() {
            this._galleryDetail();
            this._getComments();
            this.$refs.picshow.style.width = this.$refs.picture.style.width + 'px';

        },
        methods: {
            _updateThumbCount() {
                updateGalleryThumb({_id: this.gallery._id}).then(res => {
                    const {data, err_code, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.gallery.ThumbsUp = data.ThumbsUp;
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                })
            },
            _galleryDetail() {
                galleryDetail({_id: this.id}).then(res => {
                    const {err_code, data, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.gallery = data;
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                })
            },
            handleClick(form) {
                const result = Object.assign({}, form, {}, {ArticleId: this.id});
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
                getComments({ArticleId: this.id}).then(res => {
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

<style scoped lang="less">
    .gallery-detail {
        .picture {
            width: 100%;
            max-width: 685px;
            min-width: 685px;
            overflow: hidden;
            background: rgba(255, 255, 255, 0.8);
            padding-bottom: 20px;
            position: relative;
            margin-bottom: 20px;

            .piccontext {
                overflow: hidden;
                padding: 0 20px;

                h2.title {
                    margin: 20px 0;
                    font-size: 22px;
                    color: #222;
                }

                div.source {
                    height: 20px;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: 14px;

                    div.source_left {
                        height: 20px;
                        color: #666666;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;

                        span {
                            color: #ababab;
                            padding-right: 15px;
                        }
                    }
                }

                .picshow {
                    box-sizing: border-box;
                    margin-top: 20px;
                    width: 100%;
                    overflow: hidden;
                }

                .pictext {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 20px 0;
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
        }
    }

</style>
