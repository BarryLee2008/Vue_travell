<template>
  <div class="icons-container">
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper" v-if="showSwiper">
     <swiper-slide v-for="(item, index) in pages" :key="index">
        <div class="icons" v-for="item_icon in item" :key="item_icon.id">
         <div class="icon-img-div">
            <img class="icon-img" :src="item_icon.imgUrl">
         </div>
        <p class="icon-text">{{item_icon.desc}}</p>
       </div>
     </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default{
  name: 'HomeIcons',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        loop: true,
        autoplay: false
      },
      notNextTick: true,
      /*  iconsList: [
        {
          id: '0001',
          imgUrl: 'https://gw.alicdn.com/imgextra/i1/O1CN017WpyK228h6YN4yxq0_!!6000000007963-2-tps-64-64.png',
          msg: 'Global Travel Global Travel Global Travel'
        },
        {
          id: '0002',
          imgUrl: 'https://gw.alicdn.com/imgextra/i1/O1CN01OlW1y01FJTFL78sEg_!!6000000000466-2-tps-64-64.png',
          msg: 'Find a place'
        },
        {
          id: '0003',
          imgUrl: 'https://gw.alicdn.com/imgextra/i3/O1CN01ZBHPjX1S1gsTTe9OR_!!6000000002187-2-tps-64-64.png',
          msg: 'Insurance'
        },
        {
          id: '0004',
          imgUrl: 'https://gw.alicdn.com/imgextra/i2/O1CN01if50d91MCmmG0Sbph_!!6000000001399-2-tps-64-64.png',
          msg: 'Payment'
        },
        {
          id: '0005',
          imgUrl: 'https://gw.alicdn.com/imgextra/i1/O1CN017WpyK228h6YN4yxq0_!!6000000007963-2-tps-64-64.png',
          msg: 'Special Offers'
        },
        {
          id: '0006',
          imgUrl: 'https://gw.alicdn.com/imgextra/i1/O1CN01OlW1y01FJTFL78sEg_!!6000000000466-2-tps-64-64.png',
          msg: 'Watch Trailer'
        },
        {
          id: '0007',
          imgUrl: 'https://gw.alicdn.com/imgextra/i3/O1CN01ZBHPjX1S1gsTTe9OR_!!6000000002187-2-tps-64-64.png',
          msg: 'Travel Agencies'
        },
        {
          id: '0008',
          imgUrl: 'https://gw.alicdn.com/imgextra/i2/O1CN01if50d91MCmmG0Sbph_!!6000000001399-2-tps-64-64.png',
          msg: 'Luggage'
        },
        {
          id: '0009',
          imgUrl: 'https://gw.alicdn.com/imgextra/i1/O1CN017WpyK228h6YN4yxq0_!!6000000007963-2-tps-64-64.png',
          msg: 'Global Travel'
        }
      ]  */
      iconsList: this.list
    }
  },
  watch: {
    list (newVal, oldVal) {
      this.iconsList = newVal
    }
  },
  computed: {
    pages () {
      let pages = []
      /* 这里先声明一个空数组，然后让icon元素的数组做forEach循环 */
      this.iconsList.forEach((item, index) => {
        /* 每个元素除以8，向下取整。（这里除以8是因为我们设定一页只有8个）所以前8个元素的page值都等于0 */
        let page = Math.floor(index / 8)
        /* 因为前8个元素的计算结果都为0，所以第一次进入if判断的时候pages[page]==pages[0],它并没有定义，所以为false,然后取反，所以if判断成立 */
        if (!pages[page]) {
        /* 所以说给pages[0]的值设定为一个空数组，所以说相当于pages变成了二维数组 */
          pages[page] = []
        }
        /* 只要元素个数不超过8,page就不会变，就会被一一push进pages[0]中 */
        pages[page].push(item)
      })
      return pages
    },
    showSwiper () {
      return this.list.length
    }
  }
}
</script>
<!-- 下面子元素icons中仍然使用固定高宽比的方式，但是padding-bottom仍然以外层的父元素为准，所以说是25% -->
<!-- 在img标签外再包裹一层div，用来控制样式，这里采用的是居中的办法，即绝对定位+left,right,bottom+top都为零。但是这里要留下空间给文字所以bottom为0.44rem -->
<style lang="stylus" scoped>
@import '~styles/mixins'
  .icons-container >>> .swiper-container
    height: 0
    width: 100%
    padding-bottom 50%
  .icons-container
    height: 0
    width: 100%
    padding-bottom 50%
    overflow: hidden
    .icons
      position: relative
      width: 25%
      height: 0
      padding-bottom: 25%
      overflow: hidden
      float: left
      .icon-img-div
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0.44rem
        .icon-img
          width: 80%
          height: 80%
          display: block
          position: absolute
          margin: auto
          top: 0
          left: 0
          right: 0
          bottom: 0
    .icon-text
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: 0.44rem
      line-height: 0.3rem
      text-align: center
      font-size: 0.009rem
      ellipsis()
</style>
