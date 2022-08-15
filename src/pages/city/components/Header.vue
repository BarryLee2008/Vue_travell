<template>
  <div class="city-header">
    城市选择
    <router-link to="/">
        <div class="header-left">
           <span class="iconfont icon-arrow-left-bold">
        </span>
    </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'CityHeader'
}
</script>
<style lang="stylus" scoped>
@import '~styles/variables'
  .city-header
    position: relative
    height: $headerHeight
    line-height: $headerHeight
    color: #fff
    text-align: center
    background-color: $bgColor
    font-size: 0.32rem
    .header-left
      width: .64rem
      position: absolute
      left: 0
      top: 0
      text-align: center
      color: #fff
</style>
