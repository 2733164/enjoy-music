<template>
    <img src="@\assets\bgimg.jpg" alt="">
    <div class="login">
        <span>欢迎来到网易云音乐简版</span>
        <div class="info">
            <input type="text" placeholder="请输入手机号" v-model="phone" @keyup.enter="login">
            <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="login">
        </div>
        <van-button type="success" @click="login">&nbsp;&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;
            录&nbsp;&nbsp;</van-button>

    </div>
</template>
<script>
import { showToast } from 'vant'
import { getLoginUser } from '@/request/api/home'
export default {
    data() {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        async login() {
            let res = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })
            // console.log(res)
            if (res.data.code === 200) {
                this.$store.commit('updateIsLogin', true)
                this.$store.commit('updateToken', res.data.token)
                let result = await getLoginUser(res.data.account.id)
                this.$store.commit('updateUserInfo', result.data)
                this.$router.push('/userInfo')
            } else {
                showToast({
                    message: '账号或密码错误',
                    position: 'top'
                })
                this.password = ''
            }

        }

    },
}
</script>
<style lang="less" scoped>
img {
    position: absolute;
    z-index: -999;
    width: 100%;
    height: 100%;
    filter: blur(20px);
}

.login {
    // background-color: rgb(236, 154, 121);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    width: 100%;
    padding: .3rem;
    color: #fff;

    span {
        font-size: .6rem;
    }

    .info {
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        input {
            width: 70%;
            height: 1rem;
            border-radius: .1rem;
            padding-left: .2rem;
            color: #333;
        }
    }

    bottom {
        padding: 0 .4rem;
    }


}
</style>