<template>
  <div>
    <div class="header-aps" @click="backToMain" v-show="showAbs">
       <span class="iconfont icon-arrow-left-bold"></span>
    </div>
    <!-- 绑定一个属性 -->
    <div class="header-fixed" :style="opacityStyle" v-show="!showAbs">
        景点详情
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailHeader',
  methods: {
    backToMain: function () {
      this.$router.push('/')
    },
    handleScroll: function () {
      /* console.log(document.documentElement.scrollTop) 兼容性 */
      const topX = document.documentElement.scrollTop || document.body.scrollTop || document.pageYOffset
      if (topX > 60 && topX <= 140) {
        this.showAbs = false
        // 当下滚的距离超过60的时候opacity的值开始变化.用scrollTop的值来除以140，到等于140的时候opacity为1.所以使得opacity的值渐渐增大
        let opacity = topX / 140
        this.opacityStyle = {opacity}
        // 这里必须设定一个topX大于140时候的情况，因为如果用户拖拽地很快的话，会很快超过140，但是opacity的值还没有达到1
      } else if (topX > 140) {
        let opacity = 1
        this.opacityStyle = {opacity}
      } else if (topX < 60) {
        this.showAbs = true
      }
    }
  },
  data () {
    return {
      showAbs: true,
      opacityStyle: {opcity: 0}
    }
  },
  // 只要页面被加载这个钩子函数就会执行
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  // 因为是给全局对象windown绑定的事件，所以当离开这个组件去其他组件的时候要接触事件绑定，否则其他组件被加载的时候scroll事件仍然会执行
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables'
  .header-aps
    position: absolute
    left: 0.2rem
    top: 0.2rem
    width: 0.8rem
    height: 0.8rem
    line-height: 0.8rem
    border-radius: 0.4rem
    background: rgba(0,0,0,0.8)
    color: #fff
    text-align: center
    z-index: 100
 .header-fixed
   position: fixed
   left: 0
   top: 0
   right: 0
   height: $headerHeight
   line-height: $headerHeight
   background: $bgColor
   color: #fff
   text-align: center
   z-index: 100
</style>
