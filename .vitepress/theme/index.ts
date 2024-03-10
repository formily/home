import Theme from 'vitepress/theme'
import './style/var.css'
import { h } from 'vue'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    })
  },
}
