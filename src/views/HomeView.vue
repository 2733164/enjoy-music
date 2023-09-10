<template>
  <div>
    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>

import TopNav from '@/components/home/TopNav'
import SwiperTop from '@/components/home/SwiperTop'
import IconList from '@/components/home/IconList'
import MusicList from '@/components/home/MusicList'
export default {
  name: 'HomeView',
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList
  }
}
</script>
