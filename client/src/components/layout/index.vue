<template>
    <div class="layout">
        <div class="inner">
            <div class="right">
               <slot name="right"></slot>
            </div>
            <div class="left">
                <slot name="left"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout",
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .layout {
        .inner {
            margin: 0 auto;
            width: 1000px;
            max-width: 1000px;
            display: flex;
            justify-content: space-between;

            .right {
                width: 300px;
                margin-right: 15px;
            }

            .left {
                flex: 1;
            }
        }
    }
</style>
