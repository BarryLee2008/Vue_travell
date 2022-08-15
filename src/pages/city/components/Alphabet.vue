<template>
    <div>
        <ul class="item-list">
            <li class="item" v-for="key in letters" :key="key" :ref="key"
                @click="handleLetterClick"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
                >
                {{key}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'CityAlph',
  props: {
    cities: Object
  },
  data () {
    return {
      // 设定一个标识符，判断用户是否在用手指滚动屏幕
      ifTouched: true,
      strartY: 0,
      /* 设置一个时间频率 */
      timer: null
    }
  },
  computed: {
    letters: function () {
      // 创建一个数组，它的元素为所有城市的首字母分类
      let letters = []
      // 因为cities是对象所以用for in的方式来循环对象，把所有的属性名都push进数组
      for (let key in this.cities) {
        letters.push(key)
      }
      return letters
    }
  },
  methods: {
    handleLetterClick: function (e) {
      // 向父级组件传递事件，并将点击的字母作为参数
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart: function () {
      // 当触发手指触屏事件的时候，标识符改为真，表示滑动事件准备执行
      this.ifTouched = true
    },
    handleTouchMove: function (e) {
      if (this.ifTouched) {
        // 检查timer是否存在，如果存在就清除
        if (this.timer) {
          clearTimeout(this.timer)
        }
        // 不存在就设定一个16毫秒的定时器。所以说相当于就算是用户一直滚动，但是该函数每隔16毫秒才会执行，提升了效率。
        this.timer = setTimeout(() => {
        // 表示用户当前触摸点到页面可见区顶部边框（不包括工具栏和滚动条）的距离。因为实在touchmove事件中。所有只要用户还在滚动，就会实时更新该距离
        // 因为搜索框框和header有宽度所以说触摸点到滚动区域实际距离是要减去79像素
          console.log('aaa')
          let touchY = e.touches[0].clientY - 79
          let index = Math.floor((touchY - this.strartY) / 20)
          console.log(index)
          // 只有当index在A-Z的范围时才会触发change事件
          if (index >= 0 && index < this.letters.length) {
          // 当符合条件是，传递字母到父级组件，然后再传递到兄弟组件list,再就进一步滚动页面
            this.$emit('change', this.letters[index])
          }
          this.timer = null
        }, 8)
      }
    },
    handleTouchEnd: function () {
      this.ifTouched = false
    }
  },
  updated () {
    // 当cities的数据更新的时候就才执行它，提升性能
    // 获取A这个div父级元素上边框的距离
    this.strartY = this.$refs['A'][0].offsetTop
  }
}
</script>
<!-- 用了弹性布局，方向设置为垂直方向，并且元素居中显示 -->
<style lang="stylus" scoped>
  .item-list
    display: flex
    flex-direction: column
    justify-content: center
    position: fixed
    top: 1.63rem
    right: 0
    bottom: 0
    width: 0.4rem
    .item
      text-align: center
      margin-top: 0.1rem
</style>
