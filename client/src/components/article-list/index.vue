<template>
    <ul class="article-list">
        <li v-for="item in list" :key="item._id">
            <div class="text" @click="handleClick(item)">
                <h3>{{item.Title}}</h3>
                <p>{{item.Description}}</p>
            </div>
            <div class="img">
                <img :src="item.ArticleImg" alt="个人博客从简不繁">
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "articleList",
        props: {
            list: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            handleClick(item) {
                this.$emit('handleDetail', item)
            }
        }
    }
</script>

<style scoped lang="less">
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
                }

                img:hover {
                    transform: scale(1.05);
                    transition: all .5s ease;
                }
            }
        }
    }
</style>
