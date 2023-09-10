<template>
    <div class="musicDetail">
        <img :src="musicList.al.picUrl" alt="" class="bgimg">
        <div class="detailTop">
            <div class="detailTopLeft">
                <svg class="icon" aria-hidden="true" @click="backHome">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="music">
                    <Vue3Marquee style="color:#fff">{{ musicList.name }}</Vue3Marquee>
                    <div class="creator">
                        <span v-for="(ar, index) in musicList.ar" :key="ar.id"
                            :class="{ 'slash': index < (musicList.ar.length - 1) }">{{ ar.name }}</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou1-copy"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="detailTopRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang_o"></use>
                </svg>
            </div>

        </div>
        <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow = true">
            <img src="@\assets\cd.png" alt="" class="img_needle" :class="{ img_needle_active: !isbtnShow }">
            <img src="@\assets\needle-ab.png" alt="" class="img_cd">
            <img :src="musicList.al.picUrl" alt="" class="img_ar"
                :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }">
        </div>
        <div class="lyric" ref="musicLyric" v-show="isLyricShow" @click="toggleLyric">
            <p v-for="item in lyric" :key="item"
                :class="{ active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.pre) || item.time > 5400000 }">
                {{ item.lrc }}</p>
        </div>
        <div class="detailFooter">
            <div class="footerTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xihuan-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai-copy-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yinlechangpian"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi-copy"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao-copy"></use>
                </svg>
            </div>
            <div class="footerContent">
                <span>{{ filterCurrentTime }}</span>
                <input type="range" class="range" min="0" :max="duration" v-model="currentPlaybackTime" step="0.05">
                <span>{{ filterDuration }}</span>
            </div>
            <div class="footer">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiaoxunhuan"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="UpdateMusic(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="play" v-if="isbtnShow">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <svg class="icon play" aria-hidden="true" @click="play" v-else>
                    <use xlink:href="#icon-zanting"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="UpdateMusic(+1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao11-copy"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from 'vue3-marquee'
import { mapMutations, mapState, mapGetters } from 'vuex'
// import _ from 'lodash'
export default {
    data() {
        return {
            isLyricShow: false,
        }
    },
    computed: {
        ...mapState(['lyricList', 'currentTime', 'playListIndex', 'playList', 'duration']),
        ...mapGetters(['filterDuration', 'filterCurrentTime']),
        currentPlaybackTime: {
            get() {
                return this.currentTime
            },
            set(value) {
                this.$store.commit('updateCurrentTime', value)
                this.updateNewTime(this.currentTime)
            }
        },
        lyric() {
            let arr
            if (this.lyricList) {
                arr = this.lyricList.split(/[(\r\n)\r\n]/).map((item, i) => {
                    let min = item.slice(1, 3)//包前不包后
                    let sec = item.slice(4, 6)
                    let mill = item.slice(7, 10)
                    let lrc = item.slice(11)
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    // 有的毫秒有三位，有的是两位
                    // console.log(min, sec, Number(mill), lrc)
                    if (isNaN(Number(mill))) {
                        let mill = item.slice(7, 9)
                        lrc = item.slice(10)
                        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
                    }
                    return { min, sec, mill, lrc, time }
                })
                arr.forEach((item, i) => {
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 60000001
                    } else {
                        item.pre = arr[i + 1].time
                    }
                })

            }
            // console.log(arr)
            return arr
        }
    },
    mounted() {
        this.getDuration()
        // console.log(this.musicList)
    },
    updated() {
        this.getDuration()
    },
    props: ['musicList', 'play', 'isbtnShow', 'getDuration', 'updateNewTime'],
    components: {
        Vue3Marquee,
    },
    methods: {
        toggleLyric(event) {
            // console.log(event.target.tagName)
            // const lyricElement = this.$refs.musicLyric

            // 判断点击的位置是否在歌词区域范围内
            if (event.target.tagName !== 'P') {
                this.isLyricShow = false; // 点击的位置不在歌词区域，则隐藏歌词
            }
        },
        backHome() {
            this.updatedetailShow()
            this.isLyricShow = false
        },
        UpdateMusic(num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            } else if (index > this.playList.length - 1) {
                index = 0
            }
            this.updatePlayListIndex(index)
            // console.log('index' + index)
        },
        ...mapMutations(['updatedetailShow', 'updatePlayListIndex'])
    },
    watch: {
        currentTime(newValue) {
            let p = document.querySelector("p.active")
            // console.log([p])
            if (p) {
                this.$refs.musicLyric.scrollTop = p.offsetTop - 290
            }
            // this.$refs.musicLyric.scrollTop = p.offsetTop - 290
            // console.log('p.offsetTop' + p.offsetTop)
            // console.log('scrollTop' + this.$refs.musicLyric.scrollTop)

            // console.log([this.$refs.musicLyric])
            if (newValue === this.duration) {
                this.UpdateMusic(1)
            }
        }
    }

}
</script>
<style lang="less" scoped>
.musicDetail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding-bottom: .2rem;

    .lyric {
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: .4rem 0;
        padding: 0 1rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;

        p {
            font-size: .3rem;
            color: #e8e2e2;
            margin-bottom: .3rem;
            text-align: center;
        }

        .active {
            color: #fff;
            font-size: .4rem;
        }

    }

    .bgimg {
        position: absolute;
        z-index: -999;
        width: 100%;
        height: 100%;
        filter: blur(50px);
    }

    .detailTop {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        height: 1.4rem;
        width: 100%;

        .detailTopLeft {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 50%;

            .music {
                position: relative;
                padding-left: .2rem;
                width: 3rem;

                .creator {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    height: .4rem;

                    span {
                        font-size: .24rem;
                        color: #23222283;
                        padding: 0;
                    }

                    .slash::after {
                        content: "/";
                        // padding-left: .1rem;
                    }

                    .icon {
                        position: absolute;
                        width: 0.3rem;
                        height: 0.3rem;
                        bottom: .05rem;
                        vertical-align: middle;
                    }
                }
            }
        }

        .detailTopRight {
            .icon {
                width: 0.7rem;
                height: 0.7rem;
                margin-right: .2rem;
            }
        }
    }

    .detailContent {
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .img_needle {
            width: 1.8rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(-15deg);
            transition: all 2s;
        }

        .img_needle_active {
            width: 1.8rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }

        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }

        .img_ar {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }

        .img_ar_active {
            animation-play-state: running;
        }

        .img_ar_paused {
            animation-play-state: paused;
        }

        @keyframes rotate_ar {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
    }

    .detailFooter {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        // position: relative;
        height: 3rem;

        .footerTop {
            display: flex;
            justify-content: space-around;
            margin: 0 .3rem;


            .icon {
                fill: #fff;
                width: 0.6rem;
                height: 0.6rem;
            }
        }

        .footerContent {
            // width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 .2rem;

            [type="range"] {
                -webkit-appearance: none;
                appearance: none;
                margin: 0;
                outline: 0;
                background-color: transparent;
                width: 80%;
            }

            [type="range"]::-webkit-slider-runnable-track {
                height: .06rem;
                background: #eee;
            }

            [type="range" i]::-webkit-slider-container {
                height: .3rem;
                overflow: hidden;
            }

            [type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: .3rem;
                height: .3rem;
                border-radius: 50%;
                background-color: #f87268;
                border: 1px solid transparent;
                margin-top: -0.125rem;
                border-image: linear-gradient(#f87268, #f87268) 0 fill / 7 20 7 0 / 0px 0px 0 40rem;
            }

            span {
                color: #fff;
            }
        }

        .footer {
            display: flex;
            justify-content: space-around;
            bottom: 0;
            align-items: center;
            margin: 0 .3rem;


            .icon {
                fill: #fff;
            }

            .play {
                width: .8rem;
                height: .8rem;
            }

            // .pause {
            //     width: 1.5rem;
            //     height: 1.5rem;
            // }
        }
    }


}
</style>