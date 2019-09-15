<template>
    <div class="search">
        <el-input v-model="keyword"></el-input>
        <el-button @click="search">搜索</el-button>
    </div>
</template>

<script>
    export default {
        name: "search",
        data() {
            return {
                keyword: ''
            }
        },
        methods: {
            search() {
                this.$emit('keyword', this.keyword);
            }
        }
    }
</script>

<style scoped lang="less">
    .search {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: 0;

        & /deep/ .el-input__inner {
            border-radius: 0;
            border: 1px solid #000000;
        }

        & /deep/ .el-button {
            border-radius: 0;
            background: #000000;
            color: #ffffff;
            border: 1px solid #000000;
        }
    }
</style>
