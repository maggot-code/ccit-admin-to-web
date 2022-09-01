<template>
  <div class="weather">
    <span>{{ city }}</span>
    <i :class="[`qi-${icon}`, 'icon']"></i>
    <span>{{ tempMax }}℃ / {{ tempMin }}℃</span>
  </div>
</template>
<script>
import { getWeather } from "@/api/home";
import { myBrowser } from "@/utils";
export default {
  data() {
    return {
      params: {
        key: "6ec91ac799a94353aa5ec421faf1c7b7",
        location: "",
      },
      city: "",
      icon: 0,
      tempMax: 0,
      tempMin: 0,
    };
  },
  mounted() {
    this.geolocation();
  },
  methods: {
    /**
     * 浏览器定位函数
     */
    geolocation() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (res) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            that.params.location = res.point.lng + "," + res.point.lat;
            that.city = res.address.city;
            that.getWeather();
          } else {
            that.params.location = "116.398825,39.970045";
            that.city = "北京";
            that.getWeather();
          }
        },
        { enableHighAccuracy: true }
      ); //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
    },
    getWeather() {
      let browser = myBrowser();
      if (browser === "IE") return;
      getWeather(this.params).then((res) => {
        if (res.code == "200") {
          let daily = res.daily[0];
          this.icon = daily.iconDay;
          this.tempMax = daily.tempMax;
          this.tempMin = daily.tempMin;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.weather {
  height: 100%;
  line-height: 45px;
  font-size: 14px;
  .icon {
    font-size: 20px;
    margin: 0 5px;
  }
}
</style>