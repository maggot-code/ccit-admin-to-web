<template>
  <div class="container" v-show="showCustomer === '1'">
    <div
      class="btn"
      id="btn"
      :style="{ visibility: dialogVisible ? 'hidden' : 'visible' }"
      v-drag="{ set: openDialog }"
      draggable="false"
    >
      <img src="@/assets/images/cust-service.png" alt="" />
      <span>联<br />系<br />客<br />服</span>
    </div>
    <chat-dialog v-model="dialogVisible" @on-close="closeDialog"></chat-dialog>
  </div>
</template>
<script>
import chatDialog from "./chatDialog";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      showCustomer: (state) => state.settings.showCustomer,
    })
  },
  components: { chatDialog },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    // 初始化按钮位置
    let clientW = document.documentElement.clientWidth;
    let clientH = document.documentElement.clientHeight;
    let div = document.getElementById("btn");
    div.style.top = clientH / 2 + "px";
    div.style.left = clientW - 80 + "px";
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    },
  },
  directives: {
    drag(el, binding) {
      let oDiv = el;
      // 禁止选择网页上的文字
      document.onselectstart = function () {
        return;
      };
      oDiv.onmousedown = function (e) {
        // 鼠标按下，计算当前元素距离可视区的距离
        let disX = e.clientX - oDiv.offsetLeft;
        let disY = e.clientY - oDiv.offsetTop;
        // 记录初始位置
        let firstX = oDiv.offsetLeft;
        let firstY = oDiv.offsetTop;
        let l = oDiv.offsetLeft;
        let t = oDiv.offsetTop;
        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          l = e.clientX - disX;
          t = e.clientY - disY;
          // 移动当前元素
          oDiv.style.left = l + "px";
          oDiv.style.top = t + "px";
        };
        document.onmouseup = function (e) {
          if (Math.abs(l - firstX) < 3 || Math.abs(t - firstY) < 3) {
            binding.value.set(true);
          } else {
            // 拖拽事件
            let clientW = document.documentElement.clientWidth;
            let clientH = document.documentElement.clientHeight;
            // 判断偏移量,并吸壁
            // 垂直偏移量大于水平偏移量，左右吸壁，垂直控制范围
            if (Math.abs(t - firstY) > Math.abs(l - firstX)) {
              if (l > clientW / 2 - 80) {
                l = clientW - 80;
              } else {
                l = 80;
              }
              if (t < 40) t = 40;
              else if (t > clientH - 140) t = clientH - 140;
            } else {
              // 上下吸壁，水平控制范围
              if (t > clientH / 2 - 140) {
                t = clientH - 140;
              } else {
                t = 40;
              }
              if (l < 80) l = 80;
              else if (l > clientW - 80) l = clientW - 80;
            }
            oDiv.style.top = t + "px";
            oDiv.style.left = l + "px";
          }
          document.onmousemove = null;
          document.onmouseup = null;
        };
        // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
        return false;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  .btn {
    z-index: 9999;
    position: fixed;
    width: 40px;
    height: 130px;
    overflow: hidden;
    background: linear-gradient(210deg, #f3f5f8, #ffffff);
    border: 2px solid #ffffff;
    box-shadow: 3px 5px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    text-align: center;
    img {
      margin: 5px 0;
      width: 30px;
      height: 30px;
    }
    span {
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      font-family: PingFang SC;
    }
  }
}
</style>
