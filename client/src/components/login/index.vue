<template>
    <div class="login">
        <div class="login-inner">
            <h3>个人博客-登陆</h3>
            <el-form :model="form" label-width="80px" ref="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即登陆</el-button>
                    <el-button @click="toRegister">去注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {login} from '@/service'
    import {Message} from 'element-ui';
    import {current} from "../../service";

    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                const user = {
                    username: this.form.username,
                    password: this.form.password
                };
                login(user).then(res => {
                    const {err_code, data} = res.data;
                    if (err_code * 1 === 0) {
                        Message({
                            message: res.data.message,
                            type: 'success'
                        });
                        localStorage.setItem('eleToken', res.data.token);
                        this._getCurrent();
                        this.$router.push('/');
                    } else {
                        Message({
                            message: res.data.message,
                            type: 'error'
                        });
                        localStorage.removeItem('eleToken');
                    }
                    console.log(res.data);

                });
            },
            toRegister() {
                this.$router.push('/about/register');
            },
            _getCurrent() {
                current().then(res => {
                    const {err_code, data} = res.data;
                    if (err_code * 1 === 0) {
                        console.log('login');
                        this.$store.commit('setUser', data);
                        localStorage.setItem('userInfo', JSON.stringify(data));
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        overflow: hidden;
        width: 1000px;
        max-width: 1000px;
        padding: 10px;
        height: 80%;
        background: #ffffff;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        .login-inner{
            h3{
                font-size: 26px;
                text-align: center;
                padding: 20px;
                font-weight: 500;
            }
            width: 500px;
        }
    }
</style>
