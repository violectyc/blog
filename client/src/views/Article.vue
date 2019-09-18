<template>
    <div class="article">
        <Layout>
            <template v-slot:right>
                <Tags/>
            </template>
            <template v-slot:left>

                <ArticleList/>
                <router-view/>
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
        methods: {}
    }
</script>

<style scoped lang="less">
    .article {
        position: relative;
    }
</style>
