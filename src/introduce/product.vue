<template>
  <div class="product">
    <img class="bg" src="@/assets/images/introduce/product-bg.png" />
    <div class="introduce">
      <div class="title">
        <div class="title-bg">PRODUCT INTRODUCTION</div>
        <div class="title-ch">产品介绍</div>
        <span class="title-en">PRODUCT INTRODUCTION</span>
      </div>
      <p>
        中煤信息技术（北京）有限公司隶属于中国中煤能源集团有限公司，是中国煤炭开发有限责任公司的全资子公司。公司成立于2002年7月，总部位于北京，目前资本金5000万元人民币。公司作为能源行业领先的信息化综合服务商，业务涵盖煤炭生产和贸易、煤化工、发电、装备制造、工程建设等领域，致力于能源行业大数据、智能工厂、云计算、物联网、虚拟应用等解决方案的开发，可提供信息化和自动化的规划、建设及维护等全方位信息技术服务。
      </p>
    </div>
    <div class="classify">
      <div class="classify-item" v-for="(item, index) in classify" :key="index">
        <img :src="require(`@/assets/images/introduce/classify${index}.png`)" />
        <div class="content">
          <span>{{ item.comInputField101 }}</span>
          <span>解决方案</span>
        </div>
        <div class="content classify-mask">
          <span style="font-weight: 400; font-size: 12px; text-indent: 24px">{{
            item.textareaField103
          }}</span>
          <el-button
            class="button"
            size="small"
            type="primary"
            @click="jumpToMore(item.comInputField101)"
            >查看详情</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { APIURl } from '@/utils/define'
import axios from 'axios'
axios.defaults.baseURL = APIURl
export default {
  data() {
    return {
      classify: [],
    };
  },
  mounted() {
    this.getProdPlan();
  },
  methods: {
    getProdPlan() {
      let that = this;
      axios
        .get("/api/visualdev/OnlineDev/c32bab4601c54be6bd73065ab3dd09e2/List", {
          params: {},
        })
        .then(function (res) {
          that.classify = res.data.data.list;
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    jumpToMore(name) {
      this.$router.push({ path: "/system", query: { name } });
      window.scrollTo(0, 0);
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
.bg {
  width: 100%;
  height: 400px;
}
.introduce {
  @extend %flex-center;
  flex-direction: column;
  height: 300px;
  width: 100%;
  .title {
    text-align: center;
    &-ch {
      height: 40px;
      font-size: 26px;
      font-weight: 500;
      color: #333333;
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
      z-index: -1;
    }
  }
  p {
    width: 1200px;
    margin: 20px auto 0;
    text-indent: 24px;
  }
}
.classify {
  width: 100%;
  height: 360px;
  background: #333333;
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 80px;
  @extend %flex-center;
  &-item {
    width: 200px;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    @extend %flex-center;
    flex-direction: column;
    span {
      font-size: 17px;
      color: #ffffff;
      line-height: 26px;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
      font-weight: bold;
    }
    .button {
      margin-top: 20px;
    }
  }
  &-mask {
    background-color: #07a2e8b3;
    bottom: -100%;
    transition: all 0.5s ease;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .classify-item:hover .classify-mask {
    transition: all 0.5s ease;
    bottom: 0px;
  }
}
</style>