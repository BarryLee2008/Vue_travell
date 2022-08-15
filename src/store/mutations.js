export default {
  // 这里的state指的是当前Vuex对象中的state
  changeCity (state, city) {
    state.city = city
    try {
    // 当用户改变 state值的时候，把localStorage一同改变。当用户刷新页面的时候，localStorage是最新的值
      localStorage.city = city
    } catch (e) {
    }
  }
}
