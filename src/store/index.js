// 配置Vuex,并且把state,actions和mutations单独导入
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)
// 创建并导出一个新的Vuex仓库
export default new Vuex.Store({
  // state用于存放各个组件都需要共享的数据,并且拆分成单独的文件引入。
  state,
  actions,
  mutations
})
