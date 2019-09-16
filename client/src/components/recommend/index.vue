<template>
    <div class="recommend">
        <h2>点击排行</h2>
        <ul>
            <li>
                <a href="">个人博客，我为什么要用帝国cms？</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "recommend",
        data() {
            return {}
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
        ul{
            padding: 10px;
            overflow: hidden;
            list-style: none;
            li{
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                margin-bottom: 5px;
                background: url('./li.png') left center no-repeat;
                padding-left: 20px;
                a{
                    color: #555555;
                    text-decoration: none;
                }
            }
        }
    }
</style>
