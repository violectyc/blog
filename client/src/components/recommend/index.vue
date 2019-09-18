<template>
    <div class="recommend">
        <h2>点击排行</h2>
        <ul>
            <li v-for="item in list">
                <a href="javascript:;" @click="handleClick(item)">{{item.Title}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "recommend",
        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            handleClick(article) {
                this.$router.push({name: 'ArticleDetail'});
                localStorage.setItem('articleId', article['_id']);
                localStorage.setItem('userId', article['UserId']);
            }
        }
    }
</script>

<style scoped lang="less">
    .recommend {
        background: rgba(255, 255, 255, 0.5);
        margin-bottom: 20px;
        overflow: hidden;

        h2 {
            color: #333;
            font-size: 14px;
            line-height: 30px;
            padding-left: 20px;
            background: #fff;
        }

        ul {
            padding: 10px;
            overflow: hidden;
            list-style: none;

            li {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 5px;
                background: url('./li.png') left center no-repeat;
                padding-left: 20px;

                a {
                    color: #555555;
                    text-decoration: none;
                }
            }
        }
    }
</style>
