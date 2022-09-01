<template>
  <div class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <img src="@/assets/images/custom/logo.png" class="sidebar-logo" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo'
}
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 80px;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;

    .sidebar-logo {
      width: 100%;
      height: 100%;
    }
  }
  .logo {
     left: 0;
    top: 0;
  }
}
</style>