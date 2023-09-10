<template>
    <div class="topNav">
        <div class="topLeft">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao2"></use>
            </svg>
        </div>
        <ul class="topContent">
            <li @click="$router.push('/userInfo')">我的</li>
            <li class="active">发现</li>
            <li>云村</li>
            <li>视频</li>
        </ul>
        <div class="topRight">
            <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-icon-"></use>
            </svg>
        </div>
    </div>
</template>
<style lang="less" scoped>
.topNav {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1rem;
    padding: .2rem;

    .topContent {
        display: flex;
        justify-content: space-around;
        list-style: none;
        font-size: .32rem;

        li {
            padding: 0 .2rem;
        }

        .active {
            font-weight: 900;
        }
    }
}
</style>