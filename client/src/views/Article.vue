<template>
    <div class="article">

        <Layout>
            <template v-slot:right>
                <About/>
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
    import About from '@/components/about'
    import ArticleList from '@/components/article-list'

    export default {
        name: "Article",
        data() {
            return {}
        },
        components: {
            Layout, About, ArticleList
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
