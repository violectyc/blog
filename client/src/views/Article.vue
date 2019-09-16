<template>
    <div class="article">

        <Layout>
            <template v-slot:right>
                <Tags/>
            </template>
            <template v-slot:left>
                <div class="edit">
                    <el-button type="primary" @click="toWrite">写文章</el-button>
                </div>
                <ArticleList/>
            </template>
        </Layout>
    </div>

</template>

<script>
    import Layout from '@/components/layout'
    import Tags from '@/components/tags'
    import ArticleList from '@/components/article-list'

    export default {
        name: "Article",
        data() {
            return {}
        },
        components: {
            Layout, Tags, ArticleList
        },
        methods: {
            toWrite() {
                this.$router.push('/editor');
            }
        }
    }
</script>

<style scoped lang="less">
    .article {
        .edit {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
