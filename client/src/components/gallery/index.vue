<template>
    <div class="gallery">
        <h2>相册</h2>
        <ul>
            <li v-for="item in list" :key="item._id" @click="toDetail(item)">
                <a href="javascript:;">
                    <img :src="item.CoverImg" :alt="item.Title" :title="item.Title">
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "gallery",
        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {}
        },
        methods: {
            toDetail(val) {
                this.$emit('toGalleyDetail', val);
            }
        }
    }
</script>

<style scoped lang="less">
    .gallery {
        background: rgba(255, 255, 255, 0.5);
        margin-bottom: 20px;
        overflow: hidden;

        h2 {
            color: #333;
            font-size: 14px;
            line-height: 30px;
            padding-left: 20px;
            background: #fff;
        }

        ul {
            padding: 10px;
            overflow: hidden;
            list-style: none;

            li {
                width: 32%;
                overflow: hidden;
                float: left;
                height: 80px;
                margin-bottom: 2px;
                margin-right: 2px;

                a {
                    text-decoration: none;

                    img {
                        width: 100%;
                        height: 100%;
                        transition: all .5s;

                        &:hover {
                            transform: scale(1.05);
                        }
                    }
                }
            }
        }
    }
</style>
