<template>
  <div class="foot">
    <span :style="textStyle(item)" v-for="(item, index) in list" :key="index">{{item.text}}<br /></span>
  </div>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => { } }
  },
  data() {
    return {
      list: []
    }
  },
   watch: {
    'item.list': {
      handler(val) {
        this.list = val
      }, deep: true
    },
  },
  created() {
    this.list = this.item.list
  },
  computed: {
    textStyle() {
      return(item => {
        return {
          color: item.color,
          fontSize: item.fontSize + 'px'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.foot {
  text-align: center;
}
</style>
