import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.image = "https://yundongke.gzbigbang.cn"

const app = new Vue({
    ...App
})
app.$mount()
