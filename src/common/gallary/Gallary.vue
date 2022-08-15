<template>
  <div class="gallary-container" @click="handleClickClose">
    <div class="img-wrapper">
        <swiper :options="swiperOptions" v-if="imgs.length">
           <swiper-slide v-for="(item, index) in imgs" :key="index">
             <img  class="gallery-img" :src="item">
           </swiper-slide>
        </swiper>
    <!-- Optional controls -->
    <!-- 分页控制器 -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <!-- 控制左右箭头 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <!-- 最底部的灰色透明滑动条 -->
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonGallary',
  props: {
    imgs: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        // 控制pagination的样式，这里表示页数的形式
        paginationType: 'fraction',
        // 无缝轮播
        loop: true,
        // 观察swiper的父级元素有没有变化（隐藏显示或者删除），更新是swiper
        observeParents: true,
        // 观察如果你更改swiper 的样式（隐藏/显示）或修改其子元素（添加/删除幻灯片），Swiper 会更新（重新初始化）并触发 observerUpdate 事件。
        observer: true
      }
    }
  },
  methods: {
    handleClickClose: function () {
      this.$emit('closeGallery')
    }
  }
}
</script>
<!-- 下面的是一种元素居中办法 -->
<style lang="stylus" scoped>
  .gallary-container
    display: flex
    flex-direction: column
    justify-content: center
    z-index: 99
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: #000
    .img-wrapper
      background: #fff
      width: 100%
      height: 0
      padding-bottom: 100%
      overflow: hidden
      .gallery-img
        width: 100%
      .swiper-pagination
        color:ivory
        bottom: 40px
</style>
