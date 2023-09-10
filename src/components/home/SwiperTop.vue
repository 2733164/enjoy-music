<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render indicator-color="#db8282">
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import { getBanner } from '@/request/api/home';
import { ref, onMounted } from 'vue'
export default {
    setup() {
        const state = ref({
            images: [
                "http://p1.music.126.net/u7HwJJWM0y0NJ5RWocXiXw==/109951168884536595.jpg"
            ]
        });
        onMounted(async () => {
            // axios.get('http://localhost:3000/banner?type=2').then(res => {
            //     state.value.images = res.data.banners
            //     //console.log(state.images[0].pic)//这是一张图片
            // })
            let res = await getBanner()
            state.value.images = res.data.banners
            // console.log(res.data.banners)
        })
        return { state };
        /*const state = reactive({
            images: [
                "http://p1.music.126.net/u7HwJJWM0y0NJ5RWocXiXw==/109951168884536595.jpg"
            ]
        });
        onMounted(() => {
            axios.get('http://localhost:3000/banner?type=2').then(res => {
                state.images = res.data.banners
                console.log(state.images[0].pic)
            })
        })
        return { state };*/
    },
}

</script>
<style lang="less" scoped>
#swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;


        .van-swipe-item {
            padding: 0 0.2rem;

            img {
                width: 100%;
                height: 100%;
                border-radius: .2rem;
            }
        }
    }
}
</style>