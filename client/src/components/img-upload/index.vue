<template>
    <el-upload
            action="img"
            class="avatar-uploader"
            :auto-upload="autoUpload"
            :show-file-list="true"
            :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
    import {uploadFile} from '@/service'
    import {Message} from 'element-ui';

    export default {
        name: "img-upload",
        data() {
            return {
                imageUrl: '',
                autoUpload: true
            };
        },
        methods: {
            beforeAvatarUpload(file) {
                let formData = new FormData();
                formData.append('image', file);
                uploadFile(formData).then(res => {
                    const {err_code, name, filename, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.$emit('upload', filename);
                        console.log(res);
                        this.imageUrl = name;
                        Message({
                            type: 'success',
                            message: message
                        });
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .avatar-uploader /deep/ .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
