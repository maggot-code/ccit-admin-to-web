<template>
  <div class="navbar">
    <div class="left">
      <Logo class="logo" />
    </div>
    <NavbarRight />
  </div>
</template>

<script>
import NavbarRight from "./NavbarRight";
import Logo from "./Logo";

export default {
  components: { NavbarRight, Logo },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  // background: url("../../../assets/images/newcustom/Logo.svg") no-repeat;
  background-position-x: 100%;
  background-position-y: 100%;
  .left {
    display: flex;
    .logo {
      width: 240px;
      // padding: 20px 0;
      box-sizing: border-box;
    }
    .weather {
      width: 240px;
      margin-left: 98px;
    }
  }
}
</style>