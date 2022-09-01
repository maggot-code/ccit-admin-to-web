<template>
  <div class="container" v-show="showNote === '1'" v-drag draggable="false">
    <div class="header">
      <span class="header-title">便签</span>
      <i class="el-icon-close" @click="showNote = '0'"></i>
    </div>
    <CCITQuill
      id="note"
      :menus="menus"
      :showFullScreen="false"
      menuTooltipPosition="down"
      :height="260"
    />
  </div>
</template>
<script>
import CCITQuill from "@/components/CCITEditor/quill";
export default {
  components: { CCITQuill },
  computed: {
    showNote: {
      get() {
        return this.$store.state.settings.showNote;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showNote",
          value: val,
        });
      },
    },
  },
  data() {
    return {
      menus: [
        "bold", // 粗体
        "fontSize", // 字号
        "italic", // 斜体
        "underline", // 下划线
        "strikeThrough", // 删除线
        "foreColor", // 文字颜色
        "image", // 插入图片
      ],
    };
  },
  methods: {
    close() {},
  },
  directives: {
    drag(el) {
      const dialogHeaderEl = el.querySelector(".header-title");
      dialogHeaderEl.style.cursor = "move";

      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = el.currentStyle || window.getComputedStyle(el, null);
      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft;
        const disY = e.clientY - dialogHeaderEl.offsetTop;
        // 获取到的值带px 正则匹配替换
        let styL, styT;
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes("%")) {
          styL =
            +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
          styT =
            +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
        } else {
          styL = +sty.left.replace(/\px/g, "");
          styT = +sty.top.replace(/\px/g, "");
        }
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          const l = e.clientX - disX;
          const t = e.clientY - disY;
          let clientW = document.documentElement.clientWidth;
          let clientH = document.documentElement.clientHeight;
          if (l + styL < 0) {
            el.style.left = "0px";
          } else if (l + styL > clientW - el.offsetWidth) {
            el.style.left = `${clientW - el.offsetWidth}px`;
          } else {
            el.style.left = `${l + styL}px`;
          }
          if (t + styT < 0) {
            el.style.top = "0px";
          } else if (t + styT > clientH - el.offsetHeight) {
            el.style.top = `${clientH - el.offsetHeight}px`;
          } else {
            el.style.top = `${t + styT}px`;
          }
        };
        document.onmouseup = function (e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: fixed;
  width: 300px;
  right: 20px;
  bottom: 20px;
  height: 330px;
  z-index: 1000;
  .header {
    height: 30px;
    background-color: #1890ff;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color: #ffffff;
      line-height: 30px;
      flex: 1;
      padding-left: 10px;
    }
    i {
      color: #fff;
      line-height: 30px;
      padding-right: 10px;
    }
  }
}
</style>
