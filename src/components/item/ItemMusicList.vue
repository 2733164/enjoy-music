<template>
    <div class="itemMusicList">
        <div class="top">
            <div class="left">
                <div class="play">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                    </svg>播放全部<span>(共{{ itemList.length }}首)</span>
                </div>
            </div>
            <div class="right">
                <van-button round type="success" color="#fb432b">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiahao"></use>
                    </svg>
                    收藏({{ getCount(subscribedCount) }})</van-button>
            </div>
        </div>
        <div class="content">
            <ul>
                <li v-for="(musicList, index) in itemList" :key="musicList.defineComponent" class="alone">
                    <div class="itemLeft" @click="playMusic(index)">
                        <span>{{ index + 1 }}</span>
                        <div class="music">
                            <div class="name">{{ musicList.name }}</div>
                            <div class="creator">
                                <span v-for="(ar, index) in musicList.ar" :key="ar.id"
                                    :class="{ 'slash': index < (musicList.ar.length - 1) }">{{ ar.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="itemRight">
                        <svg class="icon" aria-hidden="true" v-if="musicList.mv !== 0">
                            <use xlink:href="#icon-shipin1"></use>
                        </svg>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-liebiao1"></use>
                        </svg>
                    </div>
                </li>
                <li class="blank"></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { useStore, mapMutations } from 'vuex'
export default {
    setup(props) {
        // console.log(props)
        // console.log(props.itemList[2].ar[0].name);
        const getCount = (count) => {
            if (count >= 100000000) {
                return (count / 100000000).toFixed(1) + '亿'
            } else if (count >= 10000) {
                return (count / 10000).toFixed(1) + '万'
            } else {
                return count
            }
        }
        // const store = useStore()

        // const updatePlayList = () => {
        //     store.commit('updatePlayList');
        // }
        // const playMusic = () => {
        //     updatePlayList(props.itemList)
        // }

        return { getCount }
    },
    props: ['itemList', 'subscribedCount'],
    methods: {
        playMusic(i) {
            this.updatePlayList(this.itemList)
            // this.updateId(id)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(['updatePlayList', 'updatePlayListIndex'])
    }

}
</script>   
<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    background-color: #fff;
    border: #fff;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    padding: .2rem;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: .8rem;

        .left {
            .icon {
                vertical-align: middle;
                margin-right: .3rem;
            }

            font-weight: 700;

            .play {
                span {
                    font-size: .24rem;
                    color: #45454583;
                    font-weight: 400;
                }
            }
        }

        .right {
            .icon {
                vertical-align: bottom;
                fill: #fff;
                width: .45rem;
                height: .45rem;
            }
        }
    }

    .content {
        margin-top: .2rem;

        .alone {
            display: flex;
            justify-content: space-between;
            height: 1rem;

            align-items: center;

            .itemLeft {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    width: 0.5rem;
                    padding-right: .4rem;
                }

                .music {
                    .name {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        height: .4rem;
                        width: 4.5rem;
                        font-weight: 600;
                        font-size: .3rem;
                    }

                    .creator {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        height: .4rem;
                        width: 4.5rem;

                        span {
                            font-size: .24rem;
                            color: #23222283;
                            padding: 0;
                        }

                        .slash::after {
                            content: "/";
                            // padding-left: .1rem;
                        }
                    }
                }
            }

            .itemRight {
                .icon {
                    width: .6rem;
                    height: 0.6rem;
                    margin: 0 .1rem;
                }
            }
        }

        .blank {
            width: 100%;
            height: 1.4rem;
        }

    }
}
</style>                                              