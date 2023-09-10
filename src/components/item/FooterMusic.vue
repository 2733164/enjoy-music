<template>
    <div class="footerMusic">
        <div class="footerLeft" v-if="playList && playList[playListIndex]" @click="updatedetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div class="music">
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以切换上下首</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-bofang1"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao11"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3 `">
        </audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ width: '100%', height: '100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :getDuration="getDuration"
                :updateNewTime="updateNewTime"></MusicDetail>
        </van-popup>

    </div>
</template>
<script>
import MusicDetail from '@/components/item/MusicDetail'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            timer: 0
        }
    },
    components: {
        MusicDetail
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
    },
    // mounted() {
    //     this.$refs.audio.addEventListener('canplay', () => {
    //         this.isLoaded = true // 音频资源加载完成
    //     });
    //     console.log(this.$refs)
    // },
    mounted() {
        // console.log(this.$refs)
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        // this.$refs.audio.currentTime = localStorage.getItem('currentTime') || 0
        // console.log('duration:' + this.duration)
        // this.getDuration()
    },
    updated() {
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
        this.getDuration()
        // console.log('FooterMusic的update执行了')
    },
    methods: {
        play() {
            // 判断音乐是否播放
            // if (this.$refs.audio.paused && this.isLoaded) {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()
            } else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true)
                clearInterval(this.timer)//清除定时器
            }
        },
        getDuration() {
            this.updateDuration(this.$refs.audio.duration)
        },
        updateTime() {
            this.timer = setInterval(() => {
                this.updateCurrentTime(this.$refs.audio.currentTime)
                // localStorage.setItem('currentTime', this.$refs.audio.currentTime)
            }, 1000)
        },
        updateNewTime(value) {
            this.$refs.audio.currentTime = value
        },
        ...mapMutations(['updateIsbtnShow', 'updatedetailShow', 'updateCurrentTime', 'updateDuration'])
    },
    watch: {
        playListIndex() {
            // 监听下标，如果下标发生改变，则让它自动播放音乐
            // this.isLoaded = false
            this.$refs.audio.autoplay = true
            this.updateTime()
            if (this.$refs.audio.paused) {//如果是暂停状态，改变图标
                this.updateIsbtnShow(false)
            }
        },

        playList() {
            // if (this.playListIndex === 0) {
            //     this.$refs.audio.autoplay = true
            //     this.updateIsbtnShow(false)
            // }
            this.$refs.audio.autoplay = true
            this.updateTime()
            this.updateIsbtnShow(false)
        }
        // 'playList.id': () => {
        //     this.$refs.audio.autoplay = true
        //     if (this.$refs.audio.paused) {//如果是暂停状态，改变图标
        //         this.updateIsbtnShow(false)
        //     }
        // }
    }

}
</script>
<style lang="less" scoped>
.footerMusic {
    display: flex;
    position: fixed;
    justify-content: space-between;
    width: 100%;
    height: 1.4rem;
    background-color: #fff;
    margin-top: .1rem;
    bottom: 0;
    border-top: .02rem solid #ccc;
    padding: .2rem;

    .footerLeft {
        display: flex;
        justify-content: space-around;
        width: 50%;
        height: 100%;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        .music {
            p {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                height: .4rem;
                font-size: .3rem;
                font-weight: 600;
            }

            span {
                font-size: 0.24rem;
                color: #23222283;
            }
        }
    }

    .footerRight {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 20%;
        height: 100%;
    }
}
</style>