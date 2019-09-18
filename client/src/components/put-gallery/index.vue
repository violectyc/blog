<template>
    <div class="put-gallery">
        <el-form ref="form" label-width="80px">
            <el-form-item label="相册名称">
                <el-input v-model="Title"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="Description"></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <ImgUpload class="upload" @upload="handleCover"/>
            </el-form-item>
            <el-form-item label="列表">
                <ImgUpload :only="only" class="upload" @upload="handleList"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveGallery">立即创建</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import ImgUpload from '@/components/img-upload'
    import {putGallery} from '@/service'

    export default {
        name: "putGallery",
        data() {
            return {
                Title: '',
                Description: '',
                CoverImg: '',
                ImgList: [],
                ImgListPreview: [],
                only: true,
                UserId: ''
            }
        },
        created() {
            this.UserId = localStorage.getItem('userId');
        },
        components: {
            ImgUpload
        },
        methods: {
            handleCover(cover) {
                this.CoverImg = cover;
            },
            handleList(list) {
                this.ImgList.push(list);
            },
            saveGallery() {
                const result = {
                    Title: this.Title,
                    Description: this.Description,
                    CoverImg: this.CoverImg,
                    ImgList: this.ImgList
                };
                console.log(result);
                this._putGallery();
            },
            goBack() {
                this.$router.go(-1);
            },
            _putGallery() {
                putGallery({
                    Title: this.Title,
                    Description: this.Description,
                    CoverImg: this.CoverImg,
                    ImgList: this.ImgList,
                    UserId: this.UserId
                }).then(res => {
                    console.log(res);
                });
            }
        }
    }
</script>

<style scoped lang="less">
    .put-gallery {
        box-sizing: border-box;
        padding: 30px 10px;
    }
</style>
