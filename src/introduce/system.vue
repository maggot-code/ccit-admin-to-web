<template>
  <div class="system">
    <div class="bg">
      <img src="@/assets/images/introduce/product-bg.png" />
    </div>
    <div v-if="sysTabs.length > 0" class="system-tabs">
      <i
        class="el-icon-arrow-left"
        style="left: 13%"
        @click="arrowClick('pre')"
      ></i>
      <i
        class="el-icon-arrow-right"
        style="right: 13%"
        @click="arrowClick('next')"
      ></i>
      <div class="scroll-outer" ref="scrollOuter">
        <div
          ref="scrollBody"
          class="scroll-body"
          :style="{ left: scrollLeft + 'px' }"
        >
          <span
            :class="{ item, active: tabIndex === index }"
            v-for="(item, index) in sysTabs"
            :key="index"
            @click="tabClick(index)"
          >
            {{ item.comInputField103 }}
          </span>
        </div>
      </div>
    </div>
    <template v-if="sysTabs.length > 0">
      <div class="pane">
        <div class="sys">
          <div class="left">
            <div class="title">
              <img src="@/assets/images/introduce/sys_icon.png" />
              <span>{{ sysTabs[tabIndex].comInputField103 }} 简介</span>
            </div>
            <p>
              {{ sysTabs[tabIndex].comInputField105 }}
            </p>
            <div class="help">
              <el-button type="text" size="small" @click="viewDoc"
                ><img
                  src="@/assets/images/introduce/doc.png"
                  alt=""
                />产品文档</el-button
              >
              <el-button type="text" size="small"
                ><img
                  src="@/assets/images/introduce/chat.png"
                  alt=""
                />联系客服</el-button
              >
            </div>
          </div>
          <el-button type="primary" plain size="small" @click="goToUse"
            >立即试用</el-button
          >
        </div>
        <div class="part">
          <div class="title">
            <div class="title-bg">FUNCTION INTRODUCTION</div>
            <div class="title-ch">产品优势</div>
            <span class="title-en">FUNCTION INTRODUCTION</span>
          </div>
          <el-tabs
            v-if="sysInfo.advantage.length > 0"
            class="tabs"
            stretch
            :value="sysInfo.advantage[0].comInputField103"
          >
            <el-tab-pane
              v-for="(item, index) in sysInfo.advantage"
              :key="index"
              :label="item.comInputField103"
              :name="item.comInputField103"
            >
              <div class="part-pane">
                <p>
                  {{ item.comInputField107 }}
                </p>
                <!-- <ul>
                  <li>
                    绩效数据与企业经营数据联动，降低经营成本、激发内部活力；
                  </li>
                  <li>绩效核算过程自动完成，节省大量人力，减少错误率；</li>
                  <li>绩效数据沉淀后辅助指导绩效指标的编制，形成长效机制。</li>
                </ul> -->
                <img
                  v-if="item.imgUrl"
                  class="part-img"
                  :src="item.imgUrl"
                  alt=""
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="part">
          <div class="title">
            <div class="title-bg">PRODUCT CHARACTERISTICS</div>
            <div class="title-ch">产品特性</div>
            <span class="title-en">PRODUCT CHARACTERISTICS</span>
          </div>
          <div v-if="sysInfo.character.length > 0" class="grid">
            <div
              class="texing"
              v-for="(item, index) in sysInfo.character"
              :key="index"
            >
              <img :src="item.imgUrl" alt="" />
              <p>{{ item.comInputField109 }}</p>
              <span> {{ item.comInputField111 }}</span>
            </div>
          </div>
        </div>
        <div class="part">
          <div class="title">
            <div class="title-bg">APPLICATION SCENARIO</div>
            <div class="title-ch">应用场景</div>
            <span class="title-en">APPLICATION SCENARIO</span>
          </div>
          <el-tabs
            v-if="sysInfo.application.length > 0"
            class="tabs"
            stretch
            :value="sysInfo.application[0].comInputField114"
          >
            <el-tab-pane
              v-for="(item, index) in sysInfo.application"
              :key="index"
              :label="item.comInputField114"
              :name="item.comInputField114"
            >
              <div class="part-pane">
                <p>
                  {{ item.comInputField115 }}
                </p>
                <img
                  v-if="item.imgUrl"
                  class="part-img"
                  :src="item.imgUrl"
                  alt=""
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="part">
          <div class="title">
            <div class="title-bg">SUCCESSFUL CASE</div>
            <div class="title-ch">成功案例</div>
            <span class="title-en">SUCCESSFUL CASE</span>
          </div>
          <div v-if="sysInfo.case.length > 0" class="grid">
            <div
              class="case"
              v-for="(item, index) in sysInfo.case"
              :key="index"
            >
              <img :src="item.imgUrl" alt="" />
              <div class="case-msg">
                <div>{{ item.comInputField118 }}</div>
                <span>{{ item.comInputField119 }}</span
                ><br />
                <span> {{ item.comInputField121 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.baseURL = "http://192.168.3.217:3000/dev";
import define from "@/utils/define";
export default {
  data() {
    return {
      scrollLeft: 0, //滚动条偏移量
      tabIndex: 0, //系统tab索引
      sysTabs: [],
    };
  },
  mounted() {
    this.getSysList();
  },
  methods: {
    // 查询系统列表
    getSysList() {
      let json = JSON.stringify({
        comInputField101: this.$route.query.name || "",
      });
      axios
        .get(`/api/visualdev/OnlineDev/51cef0239ce24901a7a034310e81ea50/List`, {
          params: {
            json,
          },
        })
        .then((res) => {
          if (res.data.data.list.length > 0) {
            this.sysTabs = res.data.data.list[0].tableField102;
            this.getSysInfo();
          } else {
            this.sysTabs = [];
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    // 查询系统信息
    getSysInfo() {
      this.sysInfo = {
        advantage: [],
        character: [],
        application: [],
        case: [],
      };
      let json = JSON.stringify({
        comInputField101: this.sysTabs[this.tabIndex].comInputField103,
      });
      axios
        .get(`/api/visualdev/OnlineDev/c5360b8105ab4edd879a244510273231/List`, {
          params: {
            json,
          },
        })
        .then((res) => {
          if (res.data.data.list.length > 0) {
            console.log(res.data.data.list[0]);
            this.sysInfo.advantage = res.data.data.list[0].tableField102; //产品优势
            this.sysInfo.character = res.data.data.list[0].tableField108; //产品特性
            this.sysInfo.application = res.data.data.list[0].tableField113; // 应用场景
            this.sysInfo.case = res.data.data.list[0].tableField117; // 成功案例
            let img = {
              advantage: res.data.data.list[0].uploadImgField124,
              character: res.data.data.list[0].uploadImgField125,
              application: res.data.data.list[0].uploadImgField126,
              case: res.data.data.list[0].uploadImgField127,
            };
            for (var key in this.sysInfo) {
              if (this.sysInfo[key].length > 0 && img[key].length > 0) {
                for (let i = 0; i < this.sysInfo[key].length; i++) {
                  if (img[key].length > i) {
                    this.sysInfo[key][i].imgUrl =
                      define.APIURl + img[key][i].url;
                  }
                }
              }
            }
            console.log(this.sysInfo);
            this.$forceUpdate();
          }
        })
        .catch((err) => {});
    },
    tabClick(id) {
      if (id === this.tabIndex) return;
      if (this.sysTabs.length > 5) {
        let innerWidth = this.$refs.scrollBody.offsetWidth;
        let outerWidth = this.$refs.scrollOuter.offsetWidth;
        // 计算本次滑动距离
        let scrollWidth =
          parseInt(innerWidth / 10) * Math.abs(id - this.tabIndex);
        if (id > this.tabIndex) {
          // 往后滑
          if (this.scrollLeft - scrollWidth < innerWidth - outerWidth) {
            // 到最右边
            this.scrollLeft = -(innerWidth - outerWidth);
          } else {
            this.scrollLeft -= scrollWidth;
          }
        } else {
          // 往左滑
          if (this.scrollLeft + scrollWidth > 0) {
            // 到最左边
            this.scrollLeft = 0;
          } else {
            this.scrollLeft += scrollWidth;
          }
        }
      }
      this.tabIndex = id;
      this.getSysInfo();
    },
    arrowClick(type) {
      // 不需要滑动
      if (this.sysTabs.length <= 5) return;
      let outerWidth = this.$refs.scrollOuter.offsetWidth;
      let innerWidth = this.$refs.scrollBody.offsetWidth;
      if (type === "pre") {
        // 往前滑，滑动距离>0说明到最左
        if (this.scrollLeft >= 0) return;
        if (this.scrollLeft + parseInt(innerWidth / 10) > 0) {
          this.scrollLeft = 0;
        } else {
          this.scrollLeft += parseInt(innerWidth / 10);
        }
        this.tabIndex--;
      }
      if (type === "next") {
        // 往后滑，滑动距离>内部scroll宽度-外部scroll宽度，说明到最右
        if (this.tabIndex === this.sysTabs.length) return;
        if (-this.scrollLeft > innerWidth - outerWidth) return;
        if (
          -(this.scrollLeft - parseInt(innerWidth / 10)) >
          innerWidth - outerWidth
        ) {
          this.scrollLeft = -(innerWidth - outerWidth);
        } else {
          this.scrollLeft -= parseInt(innerWidth / 10);
        }
        this.tabIndex++;
      }
      this.getSysInfo();
    },
    viewDoc() {
      window.open(this.sysTabs[this.tabIndex].comInputField107, "blank");
    },
    goToUse() {
      window.open(this.sysTabs[this.tabIndex].comInputField108, "blank");
    },
  },
};
</script>
<style lang="scss" scoped>
%flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.system {
  .bg {
    width: 100%;
    height: 400px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  &-tabs {
    height: 60px;
    background-color: #333333;
    box-sizing: border-box;
    position: relative;
    i {
      color: #999999;
      font-size: 28px;
      position: absolute;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .scroll-outer {
      position: absolute;
      left: 15%;
      right: 15%;
      top: 0;
      bottom: 0;
      overflow: hidden;
    }
    .scroll-body {
      height: 100%;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      -webkit-transition: left 0.3s ease;
      transition: left 0.3s ease;
    }
    .item {
      font-size: 14px;
      color: #ffffff;
      margin: 0 40px;
      font-weight: 400;
      padding-bottom: 5px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
    .active {
      color: #1f97ff;
      border-bottom: 3px solid #3ea5ff;
    }
  }
  .pane {
    width: 100%;
    //   系统简介
    .sys {
      background-color: #f8f8f8;
      height: 260px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .left {
        .title {
          display: flex;
          align-items: center;
        }
        .title img {
          width: 30px;
          height: 30px;
          margin-right: 15px;
        }
        .title span {
          font-size: 14px;
          font-weight: bold;
          color: #333333;
        }
        p {
          width: 600px;
          font-size: 12px;
          color: #666666;
          text-indent: 24px;
        }
        .help img {
          width: 14px;
          height: 14px;
          margin-right: 4px;
          top: 2px;
          position: relative;
        }
      }
    }
    //   产品优势
    .part {
      @extend %flex-center;
      flex-direction: column;
      height: auto;
      padding: 20px 0 50px;
      &-pane {
        font-size: 10px;
        color: #333333;
        @extend %flex-center;
        flex-direction: column;
        ul {
          align-self: flex-start;
          left: 80px;
          position: relative;
        }
      }
      .tabs {
        width: 1000px;
        margin-top: 20px;
      }
      &-img {
        width: 700px;
        height: 300px;
        margin-top: 20px;
      }
      .grid {
        display: grid;
        grid-template-columns: 300px 300px 300px;
        grid-template-rows: auto auto auto;
        margin: 20px 0;
        height: 400px;
        .texing {
          padding: 20px;
          @extend %flex-center;
          flex-direction: column;
          img {
            width: 35px;
            height: 35px;
          }
          p {
            font-size: 13px;
            font-weight: bold;
            color: #333333;
          }
          span {
            height: 50px;
            font-size: 10px;
            color: #666666;
            line-height: 19px;
            text-indent: 24px;
          }
        }
        .case {
          margin: 20px;
          padding: 20px 10px 0;
          background-color: #ffffff;
          display: flex;
          align-items: flex-start;
          img {
            width: 60px;
            height: 60px;
            object-fit: fill;
            vertical-align: top;
            flex-shrink: 0;
          }
          &-msg {
            margin-left: 20px;
          }
          div {
            font-size: 13px;
            font-weight: bold;
            color: #333333;
            margin-bottom: 10px;
          }
          span {
            font-size: 10px;
            color: #666666;
            display: inline-block;
            margin-bottom: 10px;
          }
        }
      }
    }
    .part:nth-child(odd) {
      background: #f8f8f8;
    }
  }
  .title {
    text-align: center;
    &-ch {
      height: 40px;
      font-size: 26px;
      font-weight: 500;
      color: #333333;
      position: relative;
    }
    &-en {
      height: 9px;
      font-size: 10px;
      color: #666666;
      border-top: 1px solid #666666;
      padding-top: 2px;
    }
    &-bg {
      font-size: 22px;
      color: #eee;
      top: 32px;
      position: relative;
    }
  }
}
</style>