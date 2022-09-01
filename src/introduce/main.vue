<template>
  <div class="main">
    <div class="intro">
      <img src="@/assets/images/introduce/main-bg.png" alt="" />
      <div class="intro-text">
        <p style="font-weight: 600">OUR<br />COMPANY</p>
        <p style="line-height: 0">公司简介</p>
        <div>
          中国中煤能源集团有限公司（简称中煤集团）是国务院国资委管理的国有重点骨干企业，前身是1982年7月成立的中国煤炭进出口总公司，主营业务包括：煤炭生产贸易、煤化工、发电、煤矿建设、煤矿装备制造以及相关工程技术服务。2006年12月，中煤集团独家发起成立的中国中煤能源股份有限公司在香港上市，2008年2月回归A
          股。截至2020年底，中煤集团资产总额4128亿元，从业人员12万人。
        </div>
      </div>
    </div>
    <div class="contact">
      <div class="left">
        <div class="title">CONTACT</div>
        <div class="title">联系我们</div>
        <div class="msg">公司地址：北京市安贞街道黄寺大街1号</div>
        <div class="msg">邮政编码：100000</div>
        <div class="msg">联系电话：400-8888-000</div>
        <div class="msg qrcode">
          <span>公众号：</span>
          <img src="@/assets/images/introduce/qrcode.png" />
        </div>
      </div>
      <div class="right" id="allmap"></div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(116.398825, 39.970045);
      map.centerAndZoom(point, 17);
      map.enableScrollWheelZoom(true);
      var mk = new BMap.Marker(point);
      map.addOverlay(mk);
    }
  },
};
</script>
<style lang="scss" scoped>
.intro {
  height: 700px;
  width: 100%;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &-text {
    position: absolute;
    left: 250px;
    bottom: 90px;
    p {
      font-size: 43px;
      font-weight: 500;
      color: #fefefe;
      line-height: 43px;
    }
    div {
      width: 530px;
      font-size: 12px;
      color: #ffffff;
      text-indent:24px;
    }
  }
}
.contact {
  height: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 100px;
  box-sizing: border-box;
  .title {
    font-size: 40px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 10px;
  }
  .msg {
    font-size: 16px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 20px;
  }
  .qrcode {
    display: flex;
    align-items: flex-start;
    img {
      width: 158px;
      height: 158px;
      background-color: #666666;
      margin-left: 16px;
    }
  }
  .right {
    width: 600px;
    height: 300px;
    margin-left: 150px;
  }
}
</style>
