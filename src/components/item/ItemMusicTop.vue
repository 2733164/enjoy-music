<template>
    <div class="itemMusicTop">
        <div class="top">
            <img :src="playList.coverImgUrl" alt="" class="bgImg">
            <div class="itemLeft">
                <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <span>歌单</span>
            </div>
            <div class="itemRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-liebiao1"></use>
                </svg>
            </div>
        </div>
        <div class="content">
            <img :src="playList.coverImgUrl" alt="">
            <span class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kaishi"></use>
                </svg>
                {{ getCount(playList.playCount) }}
            </span>
            <div class="des">
                <div class="title">{{ playList.name }}</div>
                <div class="info">
                    <img :src="playList.creator.backgroundUrl" alt="">
                    <span>{{ playList.creator.nickname }}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youjiantou1"></use>
                    </svg>
                </div>
                <div class="detail">
                    {{ playList.description }}
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou1"></use>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="operate">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiaoxi"></use>
                </svg>
                <span>{{ getCount(playList.commentCount) }}</span>
            </div>
            <div class="operate">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang_o"></use>
                </svg>
                <span>{{ getCount(playList.shareCount) }}</span>
            </div>
            <div class="operate">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <span>下载</span>
            </div>
            <div class="operate">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-show_duoxuan"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    setup(props) {
        const getCount = (count) => {
            if (count >= 100000000) {
                return (count / 100000000).toFixed(1) + '亿'
            } else if (count >= 10000) {
                return (count / 10000).toFixed(1) + '万'
            } else {
                return count
            }
        }
        console.log(props)
        return { getCount }
        // 通过props进行传值，如果拿不到数据，获取sessionStorage的数据
        // if ((props.playlist === "")) {
        //     props.playlist = sessionStorage.getItem('itemDetail')
        // }
    },
    props: ['playList']
}
</script>
<style lang="less" scoped>
.itemMusicTop {
    position: relative;
    height: 6rem;

    .bgImg {
        position: fixed;
        top: 0;
        width: 100%;
        height: 6rem;
        z-index: -1;
        filter: blur(20px);
    }

    .top {
        display: flex;
        justify-content: space-between;
        height: 1rem;
        width: 100%;
        align-items: center;
        padding: .2rem 0;

        .itemLeft,
        .itemRight {
            display: flex;
            justify-content: space-around;
            width: 25%;
            height: 100%;

            .icon {
                fill: #fff; //填充色，改svg
            }

            span {
                // font-size: 4rem;
                color: #fff;
            }
        }
    }


    .content {
        display: flex;
        justify-content: space-between;
        padding: .2rem 0;
        width: 100%;
        color: #fff;

        img {
            display: block;
            width: 35%;
            height: 35%;
            margin-left: .2rem;
            border-radius: .2rem;
        }

        .playCount {
            position: absolute;
            top: 1.35rem;
            right: 4.8rem;
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

        .des {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin: 0 .3rem;

            .title {
                font-size: .28rem;
                font-weight: 700;
            }

            .info {
                display: flex;
                align-items: center;

                img {
                    height: 0.6rem;
                    width: 0.6rem;
                    border-radius: .3rem;
                    vertical-align: middle;
                    margin-right: .2rem;
                }

                .icon {
                    width: .3rem;
                    fill: #ccc;
                }
            }

            .detail {
                position: relative;
                overflow: hidden;
                height: 0.6rem;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: .24rem;
                color: #ccc;

                .icon {
                    width: .3rem;
                    position: absolute;
                    top: .12rem;
                    right: -0.08rem;
                    fill: #ccc;
                }
            }

        }
    }

    .bottom {
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 1.5rem;

        .operate {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;

            .icon {
                width: .8rem;
                height: .8rem;
                fill: #fff;
                color: #fff
            }

            span {
                color: #fff;
            }
        }
    }
}
</style>