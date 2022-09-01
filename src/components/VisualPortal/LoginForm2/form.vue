<template>
</template>

<script>
import { batchCreateColumn } from "@/api/system/columnAuthorize";
import CCITCodeEditor from "@/components/CCITEditor/monaco";

export default {
  components: { CCITCodeEditor },
  data() {
    return {
      options: {
        readOnly: false,
        language: "json",
      },
      visible: false,
      formLoading: false,
      btnLoading: false,
      content: "",
      
    };
  },
  methods: {
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          const rtnData = this.content;
          const fixedRtnData = rtnData.replace(/("\w+":)(?=[},])/g, "$1null");
          const jsonData = JSON.parse(fixedRtnData);
          this.dataForm.columnJson = jsonData;
          this.btnLoading = true;
          batchCreateColumn(this.dataForm)
            .then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.btnLoading = false;
                  this.content = "";
                  this.$emit("refreshDataList");
                },
              });
            })
            .catch(() => {
              this.btnLoading = false;
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.formCodeEditor {
  width: 100%;
  height: 260px;
  margin: 0;
  padding: 0;
  border: 1px solid #c0c4cc;
  overflow: hidden;
}
.question {
  font-size: 18px;
  margin-left: 5px;
}
</style>