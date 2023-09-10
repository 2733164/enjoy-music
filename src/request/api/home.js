import service from '..'
// 获取首页轮播图数据
export function getBanner() {
    return service({
        methods: 'GET',
        url: '/banner?type=2'
    })
}
// 获取发现好歌单数据
export function getMusicList() {
    return service({
        methods: 'GET',
        url: '/personalized?limit=10'
    })
}
// 获取搜索信息
export function getSearch(data) {
    return service({
        method: 'GET',
        url: `/search?keywords=${data}`
    })
}
// 获取手机登录
export function getPhoneLogin(data) {
    return service({
        method: 'POST',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 获取用户详情
export function getLoginUser(data) {
    return service({
        method: 'GET',
        url: `/user/detail?uid=${data}`
    })
}