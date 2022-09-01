<template>
  <div class="comSelect-container">
    <User-TreeSelect v-model="innerValue" :placeholder="placeholder" clearable
      :disabled="disabled" v-on="$listeners" :multiple="multiple">
    </User-TreeSelect>
  </div>
</template>

<script>
export default {
  name: 'userSelect',
  props: ["value", "disabled", "placeholder", "multiple"],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      innerValue: this.value
    }
  },
  methods: {
  },
  watch: {
    innerValue(val) {
      val && this.$emit('change', val)
    },
    value(val) {
      this.innerValue = val
    }
  }
}
</script>
<style lang="scss">
.comSelect-container {
  .el-select {
    width: 100%;
  }
}
</style>