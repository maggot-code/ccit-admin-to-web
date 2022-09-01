<template>
  <el-card
    :class="['portal-box', titleColor]"
    :style="cardStyle"
  >
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <template v-if="tabs.length === 1">
          <i v-if="showIcon" :class="tabs[0].icon" style="font-size: 18px"></i>
          <span v-if="showTitle">{{ tabs[0].title }}</span>
        </template>
        <template v-else>
          <el-tabs v-model="activeTab" @tab-click="tabClick">
            <el-tab-pane
              v-for="(item, index) in tabs"
              :key="index"
              :name="index.toString()"
            >
              <span slot="label"
                ><i
                  v-if="showIcon"
                  :class="item.icon"
                  style="font-size: 18px"
                ></i
                ><span v-if="showTitle">{{ item.title }}</span></span
              >
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div class="right">
        <span v-if="item.showMore" title="更多" class="item">
         <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div :style="bodyStyle" v-loading="loading">
      <div class="map-box">
        <div class="map" v-loading="loading" :id="`allmap-${parentComp}`"></div>
        <el-autocomplete
          class="autocomplete"
          v-if="searchable"
          popper-class="autoAddressClass"
          v-model="address"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          placeholder="请输入城市名/地点"
          @select="handleSelect"
          clearable
        >
          <template slot-scope="{ item }">
            <i class="el-icon-search fl mgr10"></i>
            <div style="overflow: hidden">
              <div class="title">{{ item.title }}</div>
              <span class="address ellipsis">{{ item.address }}</span>
            </div>
          </template>
        </el-autocomplete>
      </div>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  props: {
    parentComp: {
      type: String,
      default: "dev",
    },
  },
  data() {
    return {
      map: null, //地图实例
      mk: null, //Marker实例
      point: {
        lng: 0,
        lat: 0,
      },
      loading: false,
      zoom: 17,
      address: "",
      searchable: true,
    };
  },
  watch: {
    point: {
      handler(val) {
        this.loading = true;
        if (val.lng || val.lat) {
          var point = new BMap.Point(val.lng, val.lat);
          setTimeout(() => {
            this.map.centerAndZoom(point, this.zoom);
            this.map.enableScrollWheelZoom(true);
            this.map.clearOverlays(); //清除地图上所有覆盖物
            this.mk = new BMap.Marker(point, { enableDragging: true });
            this.map.addOverlay(this.mk); //将覆盖物重新添加到地图中
            this.map.panTo(point); //将地图的中心点更改为选定坐标点
            this.loading = false;
          }, 100);
        }
      },
      deep: true,
    },
    zoom(val) {
      var point = new BMap.Point(this.point.lng, this.point.lat);
      this.map.centerAndZoom(point, val);
    },
  },
  mounted() {
    this.map = new BMap.Map(`allmap-${this.parentComp}`, {
      enableMapClick: false,
    });
  },
  methods: {
    initMap() {
      this.loading = true;
      if (this.point.lng || this.point.lat) {
        var point = new BMap.Point(this.point.lng, this.point.lat);
        this.map.centerAndZoom(point, this.zoom);
        this.map.enableScrollWheelZoom(true);
        this.mk = new BMap.Marker(point, { enableDragging: true });
        this.map.addOverlay(this.mk);
        this.map.panTo(point); //将地图的中心点更改为选定坐标点
      }
    },
    querySearchAsync(str, cb) {
      var options = {
        onSearchComplete: function (res) {
          //检索完成后的回调函数
          var s = [];
          if (local.getStatus() == BMAP_STATUS_SUCCESS) {
            for (var i = 0; i < res.getCurrentNumPois(); i++) {
              s.push(res.getPoi(i));
            }
            cb(s); //获取到数据时，通过回调函数cb返回到<el-autocomplete>组件中进行显示
          } else {
            cb(s);
          }
        },
      };
      var local = new BMap.LocalSearch(this.map, options); //创建LocalSearch构造函数
      local.search(str); //调用search方法，根据检索词str发起检索
    },
    handleSelect(item) {
      this.address = item.address + item.title; //记录详细地址，含建筑物名
      this.point = item.point; //记录当前选中地址坐标
    },
  },
};
</script>
<style lang="scss" scoped>
.map-box {
  width: 100%;
  height: 100%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
  }
  .autocomplete {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 100;
    width: 50%;
  }
  .autoAddressClass {
    li {
      i.el-icon-search {
        margin-top: 11px;
      }
      .mgr10 {
        margin-right: 10px;
      }
      .title {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .address {
        line-height: 1;
        font-size: 12px;
        color: #b4b4b4;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
