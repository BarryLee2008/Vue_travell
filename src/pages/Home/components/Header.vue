<template>
    <div class="header">
       <div class="header-left">
         <span class="iconfont icon-arrow-left-bold">
         </span>
       </div>
       <div class="header-input">
        <span class="iconfont icon-sousuo"></span>
        City/Amusement Park/Theme Park
        </div>
        <router-link to="/city">
          <div class="header-right">
            <span class="iconfont icon-jiantouxia"></span>
            <!-- 这里冲创建的Vuex的store实例中的state获取数据 -->
            {{this.city}}
          </div>
        </router-link>
    </div>
</template>
<script>
// 引入mapState,把state中的值映射到该组件中
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  data () {
    return {
      data_city: this.city
    }
  },
  watch: {
    city (newVal, oldVal) {
      this.data_city = newVal
    }
  },
  computed: {
    // 这种写法表示将state中的city属性的值映射到该局部组件中，只有当state中的属性名和局部组件中属性名一致的时候才可以这么写
    // ...表示对象展开运算符，表示将一个对象和其他对象结合称为一个新的对象。在Vuex中其表示同时使用Vuex中的state和局部组件中的data
    ...mapState(['city'])
  }
}
</script>
<!-- scoped表示只在这个单组件文件中有效，lang=stylus表示使用stylus模块 -->
<!-- 下面再style样式表中引入stylus样式表，要用@import的方式 -->
<!-- 可以在build文件中的webpack.base.conf.js中将styles目录添加一个别名以优化代码，再样式中引入别名要加“~”符号 -->
<style lang="stylus" scoped>
@import '~styles/variables.styl'
  .header
    display: flex
    line-height: $headerHeight
    height: $headerHeight
    background-color: $bgColor
    color: #fff
    .header-left
      width: .64rem
      float: left
      text-align: center
    .header-input
      flex: 1
      background-color: #fff
      margin-top: 0.12rem
      margin-bottom: 0.12rem
      border-radius: 0.1rem
      margin-left: 0.2rem
      line-height: 0.62rem
      height: 0.62rem
      color: #ccc
      padding-left: 0.1rem
    .header-right
      width: auto
      float: right
      text-align: center
      color: #fff
      padding: 0 0.1rem
</style>
