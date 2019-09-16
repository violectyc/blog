<template>
<div class="category">
    <h2>分类</h2>
    <ul>
        <li>
            <a href="">文章（13）</a>
        </li>
        <li>
            <a href="">相册（8）</a>
        </li>
    </ul>
</div>
</template>

<script>
    export default {
        name: "category",
        data(){
            return{}
        }
    }
</script>

<style scoped lang="less">
.category{
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
        li{
            margin-bottom: 10px;
            margin-left: 10px;
            list-style: none;
            a{
                color: #555555;
                text-decoration: none;
            }
        }
    }
}
</style>
