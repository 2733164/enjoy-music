import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'
export default createStore({
  state: {
    playList: [{//播放列表
      al: {
        id: 168313948,
        name: "六月疯",
        pic: 109951168698661710,
        picUrl: "https://p1.music.126.net/OHYWldtwLbJGMg7CFsCquQ==/109951168698661714.jpg",
        pic_str: "109951168698661714"
      },
      ar: [
        {
          name: '卫兰'
        }
      ],
      id: 5256469,
      name: '大哥'
    }],
    playListIndex: 0,//默认下标为0
    isbtnShow: true, //播放按钮的显示
    detailShow: false,//歌曲详情页显示
    lyricList: {},//歌词部分
    currentTime: 0,//歌曲当前播放的时间
    duration: 0,//歌曲总时长
    isLogin: false,//判断用户是否登录
    isFooterMusicShow: true,//是否显示底部组件
    token: '',
    userInfo: {}//用户信息
  },
  getters: {
    filterDuration(state) {
      if (isNaN(state.duration) && state.duration === 0) {
        return state.duration = 0.00
      } else {
        return (state.duration / 60).toFixed(2)
      }
    },
    filterCurrentTime(state) {
      if (isNaN(state.currentTime)) {
        return state.currentTime = 0.00
      } else {
        return (state.currentTime / 60).toFixed(2)
      }
      // console.log('filterCurrentTime' + filterCurrentTime)
    }
  },
  mutations: {
    updateIsLogin(state) {
      state.isLogin = true
    },
    updateToken(state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    pushPlayListValue(state, value) {
      state.playList.push(value)
    },
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playList = value
      // console.log(state.playList)
    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value
      // console.log(state.playListIndex)
    },
    // updateId(state, value) {
    //   state.playList.id = value
    // }
    updatedetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
      // console.log(state.lyricList)
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
      // console.log(state.currentTime)
    },
    updateDuration(state, value) {
      state.duration = value
      // console.log('duration' + state.duration)
    },
    updateUserInfo(state, value) {
      state.userInfo = value
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value)
      // console.log(res)
      context.commit("updateLyricList", res.data.lrc.lyric)
    },
    async getLogin(context, value) {
      let res = await getPhoneLogin(value)
      console.log(res)
      return res
    }
  },
  modules: {
  }
})
