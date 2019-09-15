<template>
    <div class="about" ref="about">
        <div class="btn-wrap" v-if="!userInfo">
            <h3>还没有登陆呢,请登陆！！！</h3>
            <div>
                <div>
                    <el-button type="primary" @click="handleClick('login')">登陆</el-button>
                </div>
                <div>
                    <el-button type="danger" @click="handleClick('reg')">注册</el-button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="user">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <font style="font-size: 18px">{{userInfo.NickName}}的博客</font>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="editUserInfo">编辑</el-button>
                    </div>
                    <div class="text item">
                        <ul>
                            <li><p>用户名:</p>
                                <p>{{userInfo.UserName}}</p></li>
                            <li><p>昵称:</p>
                                <p>{{userInfo.NickName}}</p></li>
                            <li><p>邮箱:</p>
                                <p>{{userInfo.Email}}</p></li>
                            <li><p>头像:</p>
                                <p><img :src="userInfo.Avatar" alt=""></p></li>
                            <li><p>描述:</p>
                                <p>{{userInfo.Description}}</p></li>
                            <div class="logout">
                                <el-button type="danger" @click="logOut">退出</el-button>
                            </div>
                        </ul>
                    </div>
                </el-card>
            </div>
        </div>
        <router-view/>
    </div>
</template>
<script>
    import Layout from '@/components/layout'
    import {mapState} from "vuex";
    import {MessageBox} from 'element-ui';

    export default {
        name: 'register',
        data() {
            return {}
        },
        mounted() {
            this.$refs.about.style.height=document.documentElement.clientHeight+'px';
        },
        components: {
            Layout
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        methods: {
            handleClick(val) {
                if (val === 'login') {
                    this.$router.push('/about/login')
                } else {
                    this.$router.push('/about/register')
                }
            },
            logOut() {
                MessageBox({
                    title: '提示',
                    message: '确认退出?',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    localStorage.removeItem('eleToken');
                    localStorage.removeItem('userInfo');
                    this.$store.commit('setUser', null);
                }).catch(err => {
                    console.log(err);
                });
            },
            editUserInfo() {
                this.$router.push('/about/userInfo');
            }
        }
    }
</script>
<style scoped lang="less">
    .about {
        position: relative;
        width: 1000px;
        max-width: 1000px;
        margin: 0 auto;
        height: 100%;
        .btn-wrap {
            overflow: hidden;
            box-sizing: border-box;
            width: 1000px;
            max-width: 1000px;
            margin: 0 auto;
            background: #ffffff;
            height: calc(100vh - 80px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            h3 {
                padding: 30px;
            }

            div {
                display: flex;
                align-items: center;
                justify-content: center;

                & > div {
                    width: 200px;
                    padding: 0 20px;

                    button {
                        width: 100%;
                    }
                }
            }


        }

        .user {
            width: 1000px;
            max-width: 1000px;
            margin: 0 auto;
            height: 100%;
            ul {
                li {
                    list-style: none;
                    display: flex;
                    align-items: center;

                    & p:first-child {
                        width: 10%;
                        text-align: right;
                    }

                    & p:last-child {
                        border-bottom: 1px solid #ddd;
                        flex: 1;
                        margin: 20px;

                        img {
                            width: 30%;
                        }
                    }
                }

                .logout {
                    width: 150px;
                    margin: 10px auto;

                    button {
                        width: inherit;
                    }
                }
            }
        }
    }
</style>
