<template>
  <div>
    <div :id="id"></div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  props: {
    id: {
      type: String,
      default: 'div1'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String,
    },
    placeholder: {
      type: String,
      default: "请输入内容...",
    },
    showFullScreen: {
      type: Boolean,
      default: true,
    },
    menuTooltipPosition: {
      type: String,
      default: "up",
    },
    menus: {
      type: Array,
      default: () => [
        "head", // 标题
        "bold", // 粗体
        "fontSize", // 字号
        "fontName", // 字体
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        "link", // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "quote", // 引用
        "emoticon", // 表情
        "image", // 插入图片
        "table", // 表格
        "code", // 插入代码
        "undo", // 撤销
        "redo", // 重复
      ],
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value: {
      handler(newVal) {
        if (this.editor) {
          this.editor.txt.html(newVal);
        } else {
          setTimeout(() => {
            this.editor.txt.html(newVal);
          }, 0);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // nextTick解决在线开发时，拖拽过程中组件mounted先于beforeDestroy执行问题
    this.$nextTick(() => {
      if (this.editor) return;
      let that = this;
      this.editor = new E("#" + this.id);
      this.editor.config.height = this.height; //配置高度
      this.editor.config.placeholder = this.placeholder;
      this.editor.config.uploadImgShowBase64 = true; //图片格式
      this.editor.config.showFullScreen = this.showFullScreen; //显示全屏工具栏
      this.editor.config.menus = this.menus;
      this.editor.config.menuTooltipPosition = this.menuTooltipPosition; //工具栏提示位置 up/down
      this.editor.config.onchange = function (newHtml) {
        that.$emit("input", newHtml);
      };
      this.editor.create();
    });
  },
  beforeDestroy() {
    if (!this.editor) return;
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style lang="scss" scoped>
.w-e-full-screen-editor {
  padding: 40px 20px;
  background-color: #ebeef5;
}
</style>