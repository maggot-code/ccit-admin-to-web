<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="[]">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  // height: 100vh;
  min-height: calc(100vh - 210px);
  width: 100%;
  position: relative;
  overflow: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  // margin-bottom: 10px;
  // background: url('../../assets/images/loading-iframe.gif') no-repeat center
  //   center;
  background-size: 64px 64px;
}

.fixed-header + .app-main {
  // padding-top: 50px;
  padding: 70px 20px 20px;
}

.hasTagsView {
  .app-main {
    // height: 100vh;
    min-height: calc(100vh - 210px);
  }

  .fixed-header + .app-main {
    padding: 104px 20px 20px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  padding-right: 0 !important;
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
