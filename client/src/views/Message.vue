<template>
    <div class="message-wrap">
        <layout>
            <template v-slot:right>
                right
            </template>
            <template v-slot:left>
                <div class="message">
                    <!--                    <div v-for="model in list" :key="model._id">-->
                    <!--                        <span class="img"><img :src="model.Avatar" alt=""></span>-->
                    <!--                        <div class="text">-->
                    <!--                            <p><span class="username">{{model.UserName}}</span> <span-->
                    <!--                                    class="date">{{model.Created | myDate}}</span>-->
                    <!--                            </p>-->
                    <!--                            <p class="content">{{model.Content}}</p>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <CommentsList :list="list"/>
                    <div class="pagination">
                        <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :page-size="5"
                                :total="total">
                        </el-pagination>
                    </div>
                    <PutMessage @putMessage="handleClick"/>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import Layout from '@/components/layout'
    import PutMessage from '@/components/put-message'
    import CommentsList from '@/components/comments-list'
    import {putMessage, getMessage} from '@/service'
    import {Message} from 'element-ui'


    export default {
        name: "Message",
        data() {
            return {
                list: [],
                total: 0,
                currentPage: 1
            }
        },
        components: {
            Layout, PutMessage, CommentsList
        },
        mounted() {
            this._getMessage();
        },
        methods: {
            handleClick(form) {
                // const msg = {UserName: this.UserName, Email: this.Email, Content: this.Content};
                console.log(form);
                putMessage(form).then(res => {

                    this._getMessage();
                    if (res.data.err_code == 0) {
                        Message({
                            type: 'success',
                            message: res.data.message,
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: res.data.message,
                        });
                    }
                })
            },
            _getMessage() {
                getMessage({currentPage: this.currentPage}).then(res => {
                    this.total = res.data.total;
                    console.log(res.data);
                    if (res.data.err_code == 0) {
                        this.list = res.data.data;
                        Message({
                            type: 'success',
                            message: res.data.message,
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: res.data.message,
                        });
                    }
                })
            },
            reset() {
                this.UserName = '';
                this.Email = '';
                this.Content = '';
            },

            handleCurrentChange(val) {
                console.log(val);
                this.currentPage = val;
                this._getMessage();
            }
        }
    }
</script>

<style scoped lang="less">
    .message-wrap {
        .message {
            width: 100%;
            background: #ffffff;
            .pagination {

                display: flex;
                align-items: center;
                justify-content: center;

            }
        }
    }
</style>
