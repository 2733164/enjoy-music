<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="playList">
            <van-swipe :loop="false" :width="150" class="mySwiper" :show-indicators="false">
                <van-swipe-item v-for="music in state.musicList" :key="music.id">
                    <router-link :to="{ path: '/itemMusic', query: { id: music.id } }">
                        <img :src="music.picUrl" alt="">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-kaishi"></use>
                            </svg>
                            {{ getPlayCount(music.playCount) }}
                        </span>
                        <span class="name">{{ music.name }}</span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import { getMusicList } from '@/request/api/home'
import { ref, onMounted } from 'vue'

export default {
    setup() {
        const state = ref({ musicList: [] })
        // 处理播放量
        const getPlayCount = (count) => {
            if (count >= 100000000) {
                return (count / 100000000).toFixed(1) + '亿'
            } else if (count >= 10000) {
                return (count / 10000).toFixed(1) + '万'
            } else {
                return count
            }
        }
        onMounted(async () => {
            let res = await getMusicList()
            // console.log(res.data.result)
            state.value.musicList = res.data.result
        })
        return { state, getPlayCount }
    }

}
</script>
<style lang="less" scoped>
.musicList {
    width: 100%;

    .musicTop {
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        padding: .2rem;
        align-items: center;

        .title {
            font-size: .36rem;
            font-weight: 800;
        }

        .more {
            font-size: .28rem;
            border: 1px solid #ccc;
            border-radius: .28rem;
            padding: .1rem .2rem;
        }
    }

    .playList {
        width: 100%;
        height: 4rem;

        .mySwiper {
            position: relative;
            height: 100%;

            .van-swipe-item {
                padding: .1rem;

                img {
                    width: 100%;
                    border-radius: .3rem;
                }
            }

            .playCount {
                position: absolute;
                top: .2rem;
                right: .2rem;
                color: #fff;
                // height: .4rem;
                // line-height: .4rem;
                font-size: .28rem;

                .icon {
                    width: .3rem;
                    height: .3rem;
                    vertical-align: middle;
                }


            }

            .name {
                font-size: .28rem;
            }
        }
    }
}
</style>