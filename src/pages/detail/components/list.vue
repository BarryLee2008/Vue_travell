<template>
  <div>
    <div class="item-container" v-for="(item, index) in list" :key="index">
        <div class="item-title border-bottom" >
            <span></span>
            {{item.title}}
        </div>
            <!-- 为了实现下级数组与上级数组缩进，这里给递归的组件再绑定样式。绑定样式后给每一级组件加上10px的padding,这个padding会层层增加，从而实现缩进 -->
        <div v-if="item.children" class="children-item">
            <!-- 这里是组件递归。当传入的参数有二级数组的时候如果想把二级数组也循环出来就要用到组件递归 -->
            <!-- 这个地方先判断二级数组是否纯在，如果存在就再调用一次组件直到没有下一级数组为止 -->
            <detail-list :list="item.children"></detail-list>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DetailList',
  props: {
    list: Array
  }
}
</script>
<style lang="stylus" scoped>
  .item-title
    line-height: 0.8rem
    font-size: 0.32rem
    padding: 0 0.2rem
  .children-item
    padding: 0 0.2rem
</style>
