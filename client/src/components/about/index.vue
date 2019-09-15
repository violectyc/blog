<template>
    <div class="about">
        <h2>关于</h2>
        <div>
            <i><img :src="userInfo.Avatar" alt=""></i>
            <p>{{userInfo.Description}}</p>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "about",
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        }
    }
</script>

<style scoped lang="less">
    .about {
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
        div{
            padding: 10px;
            overflow: hidden;
            i{
                width: 120px;
                float: left;
                clear: left;
                margin-right: 10px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
