<template>
 <div class="wrapper">
  <!-- 这里最开始的时候渲染的是空数组，所以加一个判断，当有值的时候才渲染数组 -->
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" v-if="showSwiper">
    <!-- slides -->
    <!-- <swiper-slide><img class="swiper-img" src="https://imgs.qunarzz.com/vs_ceph_vcimg/e99689b007a63a3e9a1df56a4fc97131.jpeg" ></swiper-slide>
    <swiper-slide><img class="swiper-img" src="https://ad-dapp-osscp.qunarzz.com/ad_dapp_oss_oper/7603042338b1215e3e8c5a32fce67933.jpg" ></swiper-slide>
    <swiper-slide><img class="swiper-img" src="https://imgs.qunarzz.com/vs_ceph_vcimg/5be2601d1f921f166646b817459a2727.jpeg"></swiper-slide> -->
    <swiper-slide v-for="item of imgList" :key="item.id">
        <img :src="item.imgUrl" class="swiper-img">
    </swiper-slide>
    <!-- Optional controls -->
    <!-- 分页控制器 -->
    <div class="swiper-pagination"  slot="pagination"></div>
    <!-- 控制左右箭头 -->
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <!-- 最底部的灰色透明滑动条 -->
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
  </swiper>
 </div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  // 接受父组件传递的参数
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      },
      notNextTick: true,
      /*  imgList: [{
        id: '001',
        imgUrl: 'https://imgs.qunarzz.com/vs_ceph_vcimg/e99689b007a63a3e9a1df56a4fc97131.jpeg'
      }, {
        id: '002',
        imgUrl: 'https://ad-dapp-osscp.qunarzz.com/ad_dapp_oss_oper/7603042338b1215e3e8c5a32fce67933.jpg'
      }, {
        id: '003',
        imgUrl: 'https://imgs.qunarzz.com/vs_ceph_vcimg/5be2601d1f921f166646b817459a2727.jpeg'
      }] */
      imgList: this.list
    }
  },
  // axios是异步操作所以要用watch来监控
  watch: {
    list: function (newVal, oldVal) {
      console.log([].length)
      this.imgList = newVal
    }
  },
  computed: {
    showSwiper: function () {
      return this.list.length
    }
  }
}
</script>
<!-- 下面这个例子是设定一个div的固定长宽比，即该div始终是占满整个父级div宽度，高度是宽度的31.25% -->
 <!-- 设定一个背景色,图片没加载时有个灰色的背景色 -->
 <!-- 因为style标签加上了scoped标签使用只能在HomeSwiper这个组件中有效，但是.swiper-pagination-bullet-active这个标签在是swiper组件中 -->
 <!-- 所以使用>>>，它表示在wrapper类标签下的.swiper-pagination-bullet-active类标签的background都是白色 -->
<style lang="stylus" scoped>
  .wrapper >>> .swiper-pagination-bullet-active
    background-color: #fff
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 31.25%
    background-color: #ccc
   .swiper-img
    width: 100%
</style>
