import { Button, Swipe, SwipeItem, Popup, Toast } from 'vant'
// 把引入进来的组件放到一个数组中
let plugins = [
    Swipe,
    SwipeItem,
    Button,
    Popup,
    Toast
]
export default function getVant(app) {
    plugins.forEach((item => {
        return app.use(item)
    }))
}