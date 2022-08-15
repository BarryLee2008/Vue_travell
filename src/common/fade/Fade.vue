<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  name: 'CommomFade'
}
</script>
<style lang="stylus" scoped>
  .fade-enter, .fade-leave-to
    opacity: 0
  .fade-enter-active, .fade-leave-active
    transition: all 1s
  .fade-enter-to, .fade-leave
    opacity: 1
</style>
