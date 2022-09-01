<template>
  <div>
    <CCIT-UploadFz  v-model="activeData.list" :fileSize="2"  sizeUnit="MB"  :limit="9"  buttonText="上传文档"  ></CCIT-UploadFz>
  </div>
</template>
<script>
export default {
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
