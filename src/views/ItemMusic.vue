<!-- <template>
    <ItemMusicTop v-if="state.playList" :playList="state.playList"></ItemMusicTop>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getMusicItemList } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop'
export default {
    setup() {
        let loading = true
        const state = ref({
            playList: {}
        })
        onMounted(async () => {
            // console.log(useRoute())
            // console.log(useRoute().query.id)
            let id = useRoute().query.id
            let res = await getMusicItemList(id)
            // console.log(res)
            state.value.playList = res.data.playlist
            console.log(state.value.playList)
            // 防止页面刷新造成数据丢失，将数据保存到sessionStorage里面
            sessionStorage.setItem('itemDetail', JSON.stringify(state))
        })
        return { state }
    },
    components: {
        ItemMusicTop
    }
}
</script> -->
<template>
    <ItemMusicTop v-if="playList" :playList="playList"></ItemMusicTop>
    <ItemMusicList v-if="itemList" :itemList="itemList" :subscribedCount="playList.subscribedCount"></ItemMusicList>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getMusicItemList, getMusicList } from '@/request/api/item'
import ItemMusicTop from '@/components/item/ItemMusicTop'
import ItemMusicList from '@/components/item/ItemMusicList'

export default {
    components: {
        ItemMusicTop,
        ItemMusicList
    },
    setup() {
        const playList = ref(null)//歌单详情页数据
        const itemList = ref(null)//歌单的歌曲
        // let loading = true

        onMounted(async () => {
            const id = useRoute().query.id
            // 获取歌单详情
            const res = await getMusicItemList(id)
            playList.value = res.data.playlist
            // 获取歌单歌曲
            let result = await getMusicList(id)
            itemList.value = result.data.songs
            // console.log(result)
            // loading = false
            // sessionStorage.setItem('itemDetail', JSON.stringify(playList.value))
        })

        return {
            playList,
            // loading
            itemList
        }
    },
}
</script>
