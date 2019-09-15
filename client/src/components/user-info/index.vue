<template>
    <div class="edit-user" ref="editUser">
        <div class="edit-inner">
            <h3>{{form.nickname}}-信息编辑</h3>
            <el-form :model="form" label-width="80px" ref="registerForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <ImgUpload class="upload" @upload="handleUpload"/>
                    <span class="oldAvatar"> <img :src="form.oldAvatar" alt=""></span>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="form.checkpass"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input type="email" v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="介绍">
                    <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateMessage">信息更新</el-button>
                    <el-button type="warning" @click="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ImgUpload from '@/components/img-upload'
    import {updateUser, current} from '@/service'
    import {Message} from "element-ui";

    export default {
        name: "userInfo",
        data() {
            return {
                form: {
                    username: '',
                    nickname: '',
                    password: '',
                    checkpass: '',
                    email: '',
                    description: '',
                    oldAvatar: '',
                    avatar: ''
                },
                rules: {
                    username: [
                        {required: true, message: '用户名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                userInfo: 'userInfo'
            })
        },
        mounted() {
            this.$refs.editUser.style.height=document.documentElement.clientHeight+'px';
            this.form.username = this.userInfo.UserName;
            this.form.nickname = this.userInfo.NickName;
            this.form.password = '';
            this.form.oldAvatar = this.userInfo.Avatar;
            this.form.email = this.userInfo.Email;
            this.form.description = this.userInfo.Description;
        },
        methods: {
            updateMessage() {
                const index = this.form.oldAvatar.lastIndexOf('/') + 1;
                this.form.avatar = this.form.avatar === '' ? this.form.oldAvatar.substr(index) : this.form.avatar;
                if (this.form.password !== this.form.checkpass) {
                    Message({
                        type: 'error',
                        message: '两次密码不一致'
                    });
                    return false;
                } else {
                    updateUser(this.form).then(res => {
                        const {err_code} = res.data;
                        if (err_code * 1 === 0) {
                            this._getCurrent();
                        }
                    })
                }

            },
            handleUpload(filename) {
                this.form.avatar = filename;
            },
            _getCurrent() {
                current().then(res => {
                    const {err_code, data} = res.data;
                    if (err_code * 1 === 0) {
                        this.$store.commit('setUser', data);
                        localStorage.setItem('userInfo', JSON.stringify(data));
                        Message({
                            type: 'success',
                            message: '更新用户信息成功'
                        });
                        this.$router.push('/about');
                    }
                })
            },
            goBack() {
                this.$router.go(-1);
            }
        },
        components: {
            ImgUpload
        }
    }
</script>

<style scoped lang="less">
    .edit-user {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 1000px;
        background: #ffffff;
        height: 100%;
        box-sizing: border-box;

        .edit-inner {
            background: #ffffff;
            h3 {
                text-align: center;
                font-size: 26px;
                font-weight: 500;
                padding: 10px;
            }

            padding: 10px;

            .oldAvatar {
                float: left;
                display: block;
                width: 178px;
                margin-left: 15px;

                img {
                    width: 100%;
                }
            }

            .upload {
                float: left;
            }
        }
    }
</style>
