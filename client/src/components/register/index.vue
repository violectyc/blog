<template>
    <div class="register">
        <div class="register-inner">
            <h3>个人博客-注册</h3>
            <el-form :model="form" label-width="80px" ref="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="form.checkpass"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input type="email" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input type="textarea" rows="2" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="toLogin">去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {register} from '@/service'
    import {Message} from "element-ui";
    import {current} from "../../service";

    export default {
        name: "index",
        data() {
            return {
                form: {
                    username: '',
                    nickname: '',
                    password: '',
                    checkpass: '',
                    email: '',
                    description: ''
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
                // this.$refs['registerForm'].validate((val => {
                //     console.log(val);
                // }));
                const user = {
                    username: this.form.username,
                    nickname: this.form.nickname,
                    password: this.form.password,
                    email: this.form.email,
                    description: this.form.description
                };
                register(user).then(res => {
                    const {err_code, message, token} = res.data;
                    if (err_code * 1 === 0) {
                        Message({
                            message: message,
                            type: 'success'
                        });
                        localStorage.setItem('eleToken', token);
                        this._getCurrent();
                        this.$router.push('/');
                    } else {
                        Message({
                            message: message,
                            type: 'error'
                        });
                        localStorage.removeItem('eleToken');
                    }
                });
            },
            toLogin() {
                this.$router.push('/about/login');
            },
            _getCurrent() {
                current().then(res => {
                    const {err_code, data} = res.data;
                    if (err_code * 1 === 0) {
                        this.$store.commit('setUser', data);
                        localStorage.setItem('userInfo', JSON.stringify(data));
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .register {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 1000px;
        max-width: 1000px;
        padding: 10px;
        overflow: hidden;
        height: 80%;
        background: #ffffff;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;

        .register-inner {
            h3 {
                font-size: 26px;
                text-align: center;
                padding: 20px;
                font-weight: 500;
            }

            width: 600px;
        }
    }
</style>
