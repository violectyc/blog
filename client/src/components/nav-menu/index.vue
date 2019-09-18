<template>
    <div style="height: 60px;margin-bottom: 20px;">
        <div class="nav-bar">
            <nav>
                <div class="log">

                </div>
                <div class="nav-menu">
                    <ul>
                        <li>
                            <router-link to="/" exact tag="a">首页</router-link>
                        </li>
                        <li>
                            <router-link to="/article"  tag="a">文章</router-link>
                        </li>
                        <li>
                            <router-link to="/gallery"  tag="a">相册</router-link>
                        </li>
                        <li>
                            <router-link to="/message" exact tag="a">留言</router-link>
                        </li>
                        <li>
                            <router-link to="/about"  tag="a">关于</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
    export default {
        name: "navMenu"
    }
</script>
<style scoped lang="less">
    .nav-bar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 60px;
        background: rgba(255, 255, 255, .9);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .04);

        nav {
            width: 1000px;
            height: inherit;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .log {
            }

            .nav-menu {
                ul {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    li {
                        list-style: none;
                        padding: 0 20px;

                        a {
                            text-decoration: none;
                            font-size: 16px;
                            color: #555555;

                            &.router-link-active {
                                color: #f65a8a;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
