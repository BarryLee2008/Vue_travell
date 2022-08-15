<template>
  <div class="list-container" ref="wrapper">
    <div>
     <div class="list-area">
        <div class="area-title border-topbottom">
            当前城市
        </div>
        <div class="button-list">
            <div class="button-wrapper">
                <div class="button">
                    {{this.city}}
                </div>
            </div>
        </div>
    </div>
    <div class="list-area">
        <div class="area-title border-topbottom">
            热门城市
        </div>
        <div class="button-list">
            <div class="button-wrapper" v-for="item in hotCities" :key="item.id" @click="handleCityClick(item.name)">
                <div class="button">
                    {{item.name}}
                </div>
            </div>
         </div>
        </div>
        <!-- 双重循环的时候父级的key值可以和子级的key值重复 -->
    <div class="list-area" v-for="(item,key) in cities" :key="key" :ref="key">
        <div class="area-title border-topbottom">
            {{key}}
        </div>
        <div class="item-list">
            <div class="item border-bottom" v-for="item_city in item" :key="item_city.id" @click="handleCityClick(item_city.name)">
                {{item_city.name}}
            </div>
        </div>
     </div>
    </div>
  </div>
</template>
<script>
// 引入better-scroll组件,引入mapState和mapAction组件
import Bscroll from 'better-scroll'
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    cities: Object,
    hotCities: Array,
    letter: String
  },
  name: 'CityList',
  methods: {
    handleCityClick (city) {
      // 用dispatch方法来调用store对象中的action以改变state的值
      /* this.$store.dispatch('changeCity', city) */
      // 这里用mapActions映射的方法来实现上一步被注释的操作
      this.changeCity(city)
      // 跳转到首页
      this.$router.push('/')
    },
    // 同mapState类似将actions中changeCity这个属性映射到局部组件的一个方法中，这里两者必须同名。
    ...mapActions(['changeCity'])
  },
  mounted () {
    /* better-scroll 固定语法通过better-scroll构建函数来创建一个better-scroll对象。构建函数必须传入dom对象 */
    this.scroll = new Bscroll(this.$refs.wrapper, {click: true})
  },
  // 加了keep-alive之后updated在再次渲染的时候不会被执行，因为浏览器会直接去cache中找储存的值。所以改成
  activated () {
    this.scroll && this.scroll.refresh()
  },
  watch: {
    letter (newVal, oldVal) {
      // 当ref和v-for一起使用的时候可以通过refs[key]的方式拿到对应的dom元素。但是refs[key]而且拿到的并不是dom元素。refs[key][0]才是
      const element = this.$refs[newVal][0]
      // 这是better-scroll的方法，参数是目标dom。这样就可以实现点击跳转到对应的滚动条区域。
      this.scroll.scrollToElement(element)
    }
  },
  computed: {
    ...mapState({
      city: 'city'
    })
  }
}
</script>
<!-- 下面的按钮div:button-list没有设定高度，而唯一的元素被浮动了，所以造成浮动坍塌。这里的解决办法是父元素设定了一个overflow：hidden触发了bfc属性。计算BFC的高度时，浮动元素也参与计算，利用这个特性可以清除浮动 -->
<!-- 下面的list-container用的是绝对定位方法，bottom:使得它挨着屏幕最底下，从而使得他的高度是固定的从而使得overflow:hidden生效 -->
<style lang="stylus" scoped>
@import '~styles/variables'
  .border-topbottom
    &:before
      border-color: #ccc
    &:after
      border-color: #ccc
  .border-bottom
    &:before
      border-color: #ccc
  .list-container
    position: absolute
    top: 1.63rem
    left: 0
    right 0
    bottom 0
    overflow: hidden
  .area-title
    width: 100%
    line-height: 0.54rem
    background-color: #eee
    color: #666
    font-size: 0.26rem
    padding-left: 0.1rem
  .button-list
    padding: 0.1rem 0.6rem 0.1rem 0.1rem
    overflow: hidden
    .button-wrapper
      width: 33%
      float: left
      .button
        margin: 0.1rem
        text-align: center
        border: 1px solid #ccc
        padding: 0.1rem 0rem
        border-radius: 0.06rem
   .item-list
     .item
       padding-left: 0.1rem
       line-height: 0.76rem
       color: #666
</style>
