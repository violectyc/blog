<template>
    <div class="comments-list">
        <div class="list" v-for="model in list" :key="model._id">
            <span class="img"><img :src="model.Avatar" alt=""></span>
            <div class="text">
                <p><span class="username">{{model.UserName}}</span> <span
                        class="date">{{model.Created | myDate}}</span>
                </p>
                <p class="content">{{model.Content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {formate} from '@/common/filter'

    export default {
        name: "commentsList",
        props: {
            list: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        filters: {
            myDate(val) {
                return formate(val);
            }
        },
    }
</script>

<style scoped lang="less">
    .comments-list {
       box-sizing: border-box;
        margin-top: 20px;
        margin-bottom: 20px;
        .list {
            box-sizing: border-box;
            width: 100%;
            padding: 10px 10px 10px 10px;
            border-bottom: 1px solid #ececec;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            display: flex;

            & > div {
                width: 100%;
                display: block;
            }

            .img {
                width: 60px;
                text-align: center;
            }

            div.text {
                flex: 1;

                p:first-child {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #000000;

                    .date {
                        color: #999;
                        font-size: 12px;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }

                p:last-child {
                    margin: 10px 0;
                }
            }
        }
    }
</style>
