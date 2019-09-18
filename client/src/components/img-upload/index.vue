<template>
    <el-upload
            action="img"
            class="avatar-uploader"
            :auto-upload="autoUpload"
            :show-file-list="true"
            :before-upload="beforeAvatarUpload">
        <i v-if="isShow" class="el-icon-plus avatar-uploader-icon"></i>
        <template  v-for="item in imgList">
            <img :src="item" class="avatar">
        </template>

    </el-upload>
</template>

<script>
    import {uploadFile} from '@/service'
    import {Message} from 'element-ui';

    export default {
        name: "img-upload",
        props: {
            only: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isShow() {
                if (!this.isOnly && this.imgList.length > 0) {
                    return false;
                }else{
                    return true;
                }
            }
        },
        data() {
            return {
                autoUpload: true,
                imgList: [],
                isOnly:false
            };
        },
        created(){
            this.isOnly = this.only;
        },
        methods: {
            beforeAvatarUpload(file) {
                let formData = new FormData();
                formData.append('image', file);
                uploadFile(formData).then(res => {
                    const {err_code, name, filename, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.$emit('upload', filename);
                        this.imgList.push(name);
                        console.log(res);
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

        .avatar-uploader-icon {
            box-sizing: border-box;
            border: 1px dashed #d9d9d9;
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            margin: 23px;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
            float: left;
            margin: 23px;
        }
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }


</style>
