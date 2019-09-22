<template>
    <div class="list">
        <ul class="list-inner">
            <li v-for="item in list" :key="item._id">
                <div class="img">
                    <a href="javascript:;">
                        <img :src="item.CoverImg" alt="">
                    </a>
                    <div class="picinfo">
                        <h3>{{item.Title}}</h3>
                        <span>{{item.Description}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import vueWaterfallEasy from 'vue-waterfall-easy'
    import {galleryList} from '@/service'
    import {Message} from "element-ui";

    export default {
        name: "gallery-list",
        data() {
            return {
                list: [],
                currentPage: 1,
                width: 1000,
            }
        },
        components: {
            vueWaterfallEasy
        },
        created() {
            this._galleryList();
        },
        methods: {
            _galleryList() {
                galleryList({currentPage: this.currentPage}).then(res => {
                    const {data, err_code, message} = res.data;
                    if (err_code * 1 === 0) {
                        this.list = this.list.concat(data);
                    } else {
                        Message({
                            type: 'error',
                            message: message
                        });
                    }
                    console.log(data);
                });
                window.addEventListener('scroll', () => {
                    let top = document.documentElement.scrollTop || document.body.scrollTop;
                    console.log(top);
                    if (top > 100) {
                        //this.getData();
                    }
                }, false)
            },
            getData() {
                this.currentPage++;
                this._galleryList();
                console.log(this.currentPage++);

            },

        }
    }
</script>

<style scoped lang="less">
    .list {
        height: 100%;

        .list-inner {
            box-sizing: border-box;

            li {
                box-sizing: border-box;
                padding: 5px;
                float: left;
                list-style: none;
                width: 25%;
                max-height: 288px;
                min-height: 288px;

                .img {
                    display: block;
                    background: #FFF;
                    margin: 0 0 20px 0;
                    border: 1px #d9d9d9 solid;

                    a {
                        display: block;
                        box-sizing: border-box;
                        padding: 10px;

                        img {
                            width: 100%;
                        }
                    }

                    .picinfo {
                        padding: 10px 20px;

                        h3 {
                            border-bottom: #ccc 1px solid;
                            padding: 10px 0;
                            /*margin: 0 20px;*/
                            font-size: 16px;
                        }

                        span {
                            line-height: 26px;
                            color: #666;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            -webkit-box-orient: vertical;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                        }
                    }
                }
            }
        }
    }
</style>
