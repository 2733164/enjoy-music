<template>
    <div class="search">
        <div class="searchTop">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou-copy"></use>
            </svg>
            <input type="text" placeholder="周杰伦" v-model="searchKey" @keydown.enter="enterKey()">
        </div>
        <div class="searchHistory">
            <span class="searchSpan">历史</span>
            <span v-for="(item, index) in keyWordList" :key="index" class="spanKey" @click="searchHistory(item)">{{ item
            }}</span>
            <svg class="icon" aria-hidden="true" @click="delHistory">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <div class="content">
            <ul>
                <li v-for="(musicList, index) in searchList" :key="musicList.defineComponent" class="alone">
                    <div class="itemLeft" @click="updateIndex(musicList)">
                        <span>{{ index + 1 }}</span>
                        <div class="music">
                            <div class="name">{{ musicList.name }}</div>
                            <div class="creator">
                                <span v-for="(ar, index) in musicList.artists" :key="ar.id"
                                    :class="{ 'slash': index < (musicList.artists.length - 1) }">{{ ar.name }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="itemRight">
                        <svg class="icon" aria-hidden="true" v-if="musicList.mvid !== 0">
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
import { getSearch } from '@/request/api/home'
export default {
    data() {
        return {
            keyWordList: [],
            searchKey: "",
            searchList: []
        }
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) ? JSON.parse(localStorage.getItem('keyWordList')) : []
    },
    methods: {
        async enterKey() {
            if (this.searchKey.trim() !== '') {
                this.keyWordList.unshift(this.searchKey)
                this.keyWordList = [...new Set(this.keyWordList)]
                if (this.keyWordList.length > 10) {
                    this.keyWordList.pop()
                }
                localStorage.setItem('keyWordList', JSON.stringify(this.keyWordList))
                let res = await getSearch(this.searchKey)
                // console.log(res)
                this.searchList = res.data.result.songs
                this.searchKey = ''

            }
        },
        delHistory() {
            localStorage.removeItem("keyWordList")
            this.keyWordList = []
        },
        async searchHistory(item) {
            let res = await getSearch(item)
            console.log(res)
            this.searchList = res.data.result.songs
        },
        updateIndex(list) {
            list.al = list.album
            list.al.picUrl = list.album.artist.img1v1Url
            list.ar = list.artists
            this.$store.commit('pushPlayListValue', list)
            this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
            // console.log(his.$store.state.playList.length)
        }
    },
}
</script>
<style lang="less" scoped>
.search {
    .searchTop {
        display: flex;
        align-items: center;
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;

        input {
            margin-left: .4rem;
            border: none;
            border-bottom: 1px solid #999;
            width: 80%;
            padding: .1rem;
        }

    }

    .searchHistory {
        width: 100%;
        padding: .2rem;
        position: relative;

        .searchSpan {
            // font-size: .4rem;    
            font-weight: 800;
        }

        .spanKey {
            display: inline-block;
            background-color: #ddd;
            padding: .1rem .2rem;
            border-radius: .4rem;
            margin: .1rem .1rem;
            font-size: .28rem;
        }

        .icon {
            position: absolute;
            top: .3rem;
            right: .4rem;
            width: 0.3rem;
            height: 0.3rem;
            fill: #aaa;
        }
    }

    .content {
        width: 100%;
        padding: 10px;
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