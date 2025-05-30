
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createStore } from 'vuex'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus,{
  locale: zhCn,
})
app.use(router)

const store = createStore({
  state: {
    username: '',
    userid: '',
    role: ''
  },
  getters: {
    getUsername: state => state.username,
    getUserid: state => state.userid,
    getRole: state => state.role
  },

})

app.mount('#app')
