<template>
    <div class="userInfo">
        <img :src="userInfo.profile.backgroundUrl" alt="" class="bgImg">
        <div class="profile">
            <img :src="userInfo.profile.avatarUrl" alt="" class="profilePt">
            <div class="nickName">{{ userInfo.profile.nickname }}</div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {

    computed: {
        ...mapState(['userInfo'])
    },
    mounted() {
        console.log(this.userInfo)
    },
}
</script>
<style lang="less" scoped>
.userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 2rem;
    // margin-top: 2rem;

    .bgImg {
        position: absolute;
        width: 100%;
        z-index: -1;
    }

    .profile {
        position: relative;
        width: 100%;
        margin-top: 6rem;
        text-align: center;
        border-radius: .1rem;
        background-color: #fff;

        .profilePt {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        .nickName {
            font-size: .4rem;
            font-weight: 700;
        }
    }
}
</style>