<template>
  <div>
    <!-- 搜索框 -->
    <div class="search-container">
      <input type="text" placeholder="输入城市名或拼音" class="search-input" v-model="keyword">
    </div>
    <!-- 搜索内容 -->
    <!-- 只有输入框有内容的时候才会显示搜索内容 -->
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li v-for="item in list" :key="item.id" class="search-item border-bottom" @click="handleCityClick(item.name)">
           {{item.name}}
        </li>
        <!-- 当没有相关城市，list的长度为0的时候就会显示 -->
        <li  class="search-item border-bottom" v-show="hasResult">
          没有找到相关城市
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import { mapActions } from 'vuex'
export default {
  name: 'CitySearch',
  data () {
    return {
      keyword: '',
      list: [],
      timer: null
    }
  },
  props: {
    cities: Object
  },
  /* 设置一个侦听器，监视keyword的变化一旦有输入的值就要进行相应的操作 */
  watch: {
    keyword () {
      /* 设置一个函数防抖功能，限定如果在100ms内用户反复输入keyword，只执行最后一下 */
      /* 第一步判断定时器是否存在，如果存在表明已经开始执行，但是在规定的时间里用户又进行了操作，所以重新计时 */
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 当keyword为空的时候，即用户删除了关键字后，搜索内容要清空.
      if (!this.keyword) {
        this.list = []
        return
      }
      /* 第二步，给timer设定一个定时器。设定隔100ms才会执行 */
      this.timer = setTimeout(() => {
        // 设定一个空数组来接受搜索的返回值
        let resultArr = []
        // 遍历城市对象，获得每个字母开头的城市
        for (let key in this.cities) {
          // 用forEach遍历某个字母开头的每一个城市
          this.cities[key].forEach(item => {
            // 用indexOf来判断当前输入的keyword是否有匹配的城市，并且支持拼音和汉字
            if (item.name.indexOf(this.keyword) > -1 || item.spell.indexOf(this.keyword) > -1) {
              // 把结果push到resultArr数组中
              resultArr.push(item)
            }
          })
        }
        this.list = resultArr
        // 执行完逻辑代码后把timer归零，表示用户可以马上进行下一次操作了。
        this.timer = null
      }, 100)
    }
  },
  methods: {
    handleCityClick (city) {
      // 用dispatch方法来调用store对象中的action以改变state的值
      this.$store.dispatch('changeCity', city)
      // 跳转到首页
      this.$router.push('/')
    },
    ...mapActions(['changeCity'])
  },
  mounted () {
    // 使用better-scroll组件
    this.scroll = new Bscroll(this.$refs.search, {click: true})
  },
  // 用better-scroll时，如果数据是动态变化的，一定要用下面这段代码
  // 它的意思是：当页面出现数据变化的时候updated（如果有keep-alive就是activated）钩子函数会执行，然后scroll的内容会刷新
  activated () {
    this.scroll && this.scroll.refresh()
  },
  computed: {
    hasResult () {
      /* 取list标签的长度的反值，当有值的时候反值假不显示，当没有值的时候反值是真，就会显示 */
      return !this.list.length
    }
  }
}
</script>
<!-- 下面这里在加上padding后盒模型整体变宽，所以用box-sizing: boder-box保证盒模型的整体大小和原来一样，压缩内部的宽度 -->
<style lang="stylus" scoped>
@import '~styles/variables'
  .search-container
    height: 0.72rem
    background-color: $bgColor
    padding: 0.1rem
    .search-input
      box-sizing: border-box
      width: 100%
      line-height: 0.62rem
      height: 0.62rem
      border-radius: 0.06rem
      text-align: center
      padding: 0 0.1rem
  .search-content
    position: absolute
    top: 1.63rem
    bottom: 0
    left: 0
    right: 0
    background-color: #eee
    z-index: 1
    overflow: hidden
    .search-item
      padding-left: 0.1rem
      line-height: 0.62rem
      color: #666
      background-color: #fff
</style>
