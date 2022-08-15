export default {
  changeCity (ctx, city) {
    // 用ctx表示当前Vuex对象，可以使用commit方法触发mutations
    // 这句代码意思是action事件changeCity进一步触发mutations事件以修改state
    ctx.commit('changeCity', city)
  }
}
