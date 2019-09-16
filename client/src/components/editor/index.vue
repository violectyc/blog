<template>
    <div class="editor">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章简介">
                <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="文章封面">
                <img-upload @upload="saveArticle"></img-upload>
            </el-form-item>
            <div class="editor-wrap">
                <vue-editor v-model="form.content"></vue-editor>
            </div>
            <el-form-item label="文章来源">
                <el-select placeholder="请选择文章来源" v-model="form.origion">
                    <el-option label="原创" value="原创"></el-option>
                    <el-option label="转载" value="转载"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章类型">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="IT" name="type"></el-checkbox>
                    <el-checkbox label="科技" name="type"></el-checkbox>
                    <el-checkbox label="历史" name="type"></el-checkbox>
                    <el-checkbox label="其他" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <div class="btn-group">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button @click="goBack">取消</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
    import {VueEditor} from "vue2-editor";
    import ImgUpload from '@/components/img-upload'
    import {articleAdd} from '@/service'

    export default {
        name: "editor",
        data() {
            return {
                form: {
                    title: '',
                    description: '',
                    origion: '',
                    type: [],
                    content: '',
                    articleImg: ''
                }
            }
        },
        components: {
            VueEditor, ImgUpload
        },
        methods: {
            onSubmit() {
                console.log(this.form);
                articleAdd(this.form).then(res => {
                    console.log(res);
                });
            },
            saveArticle(val) {
                if (val !== '') {
                    this.form.articleImg = val;
                }
            },
            goBack(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="less">
    .editor {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        transform: translate(50%,0%);
        width: 1000px;
        max-width: 1000px;
        background: #ffffff;
        padding: 15px;

        .editor-wrap {
            padding-left: 15px;
            margin-bottom: 22px;
        }

        .btn-group {
            padding-left: 15px;
            margin-bottom: 22px;
        }

    }
</style>
