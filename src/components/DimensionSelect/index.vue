<template>
  <el-select
    v-show="dimensionList.length"
    placeholder="请选择维度"
    v-model="currentDimension"
  >
    <el-option
      v-for="item in dimensionList"
      :key="item.encode"
      :label="item.fullname"
      :value="item.encode"
    ></el-option>
  </el-select>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["dimensionList"]),
    currentDimension: {
      get() {
        return this.$store.getters.currentDimension
      },
      set(val) {
        this.$store.commit("base/SET_CURRENT_DIMENSION", val);
      }
    },
  },
  mounted() {
    this.$store.dispatch("base/getDimensionList");
  }
};
</script>
