<template>
    <div class="message-wrap">
        <layout>
            <template v-slot:right>
                right
            </template>
            <template v-slot:left>
                <div class="message">
                    <div v-for="model in list" :key="model._id">
                        <span class="img"><img :src="model.Avatar" alt=""></span>
                        <div class="text">
                            <p><span class="username">{{model.UserName}}</span> <span
                                    class="date">{{model.Created | myDate}}</span>
                            </p>
                            <p class="content">{{model.Content}}</p>
                        </div>
                    </div>
                    <div class="pagination">
                        <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :page-size="5"
                                :total="total">
                        </el-pagination>
                    </div>
                    <!--                    message-->
                    <div class="put-message">
                        <el-form ref="form" label-width="80px">
                            <el-form-item label="您的姓名">
                                <el-input v-model="UserName"></el-input>
                            </el-form-item>
                            <el-form-item label="您的邮箱">
                                <el-input v-model="Email"></el-input>
                            </el-form-item>
                            <el-form-item label="留言内容">
                                <el-input v-model="Content" type="textarea" rows="5"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleClick">立即创建</el-button>
                                <el-button @click="reset">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
    import Layout from '@/components/layout'
    import {putMessage, getMessage} from '@/service'
    import {Message} from 'element-ui'
    import {formate} from '@/common/filter'

    export default {
        name: "Message",
        data() {
            return {
                UserName: '',
                Email: '',
                Content: '',
                list: [],
                total: 0,
                currentPage: 1
            }
        },
        filters: {
            myDate(val) {
                return formate(val);
            }
        },
        components: {
            Layout
        },
        mounted() {
            this._getMessage();
        },
        methods: {
            handleClick() {
                const msg = {UserName: this.UserName, Email: this.Email, Content: this.Content};
                putMessage(msg).then(res => {
                    console.log(res);
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

            & > div {
                margin: 10px;
                padding: 10px 10px 10px 10px;
                border-bottom: 1px solid #ececec;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                display: flex;

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

            .pagination {

                display: flex;
                align-items: center;
                justify-content: center;

            }

            .put-message {
                .el-form {
                    width: 100%;
                }
            }
        }
    }
</style>
