<template>
    <div class="tags">
        <h2>标签云</h2>
        <ul>
            <li>个人博客</li>
            <li>旅游</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tags",
        data(){
            return{}
        }
    }
</script>

<style scoped lang="less">
.tags{
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
            list-style: none;
            cursor: pointer;
            line-height: 24px;
            height: 24px;
            display: block;
            background: #999;
            float: left;
            padding: 3px 11px;
            margin: 10px 10px 0 0;
            border-radius: 8px;
            -moz-transition: all 0.5s;
            -webkit-transition: all 0.5s;
            -o-transition: all 0.5s;
            transition: all 0.5s;
            color: #FFF;
            &:nth-child(1){
                background: #036564;
            }
            &:nth-child(2){
                background: #3299BB;
            }
        }
    }
}
</style>
