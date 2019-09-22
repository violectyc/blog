<template>
    <div class="p-message">
        <div class="put-message">
            <el-form ref="form" label-width="80px">
                <el-form-item label="您的姓名">
                    <el-input v-model="form.UserName"></el-input>
                </el-form-item>
                <el-form-item label="您的邮箱">
                    <el-input v-model="form.Email"></el-input>
                </el-form-item>
                <el-form-item label="留言内容">
                    <el-input v-model="form.Content" type="textarea" rows="5"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleClick">立即创建</el-button>
                    <el-button @click="reset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "putMessage",
        data() {
            return {
                form: {
                    UserName: '',
                    Email: '',
                    Content: ''
                }
            }
        },
        methods: {
            handleClick() {
                this.$emit('putMessage', this.form)
            },
            reset() {
                this.form.UserName = '';
                this.form.Email = '';
                this.form.Content = '';
            }
        }
    }
</script>

<style scoped lang="less">
    .p-message {
        box-sizing: border-box;
        margin: 10px 0;
        .put-message {
            box-sizing: border-box;
            width: 100%;
            padding: 10px;
        }
    }
</style>
