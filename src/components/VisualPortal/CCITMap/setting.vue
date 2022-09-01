<template>
  <div>
    <el-form-item label="关键字">
      <el-autocomplete
        style="width: 100%"
        popper-class="autoAddressClass"
        v-model="activeData.address"
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
    </el-form-item>
    <el-form-item label="经度">
      <el-input v-model="activeData.point.lng"></el-input>
    </el-form-item>
    <el-form-item label="纬度">
      <el-input v-model="activeData.point.lat"></el-input>
    </el-form-item>
    <el-form-item label="缩放级别">
      <el-input-number v-model="activeData.zoom" :min="3" :max="19"></el-input-number>
    </el-form-item>
    <el-form-item label="显示搜索">
      <el-switch v-model="activeData.searchable"></el-switch>
    </el-form-item>
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
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.map = new BMap.Map("", { enableMapClick: false });
    if (this.activeData.point.lng || this.activeData.point.lat) return;
    this.geolocation();
  },
  methods: {
    /**
     * 浏览器定位函数
     */
    geolocation() {
      var that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function (res) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            that.getAddrByPoint(res.point); //当成功时，调用逆地址解析函数
          } else {
            alert("failed" + this.getStatus()); //失败时，弹出失败状态码
          }
        },
        { enableHighAccuracy: true }
      ); //enableHighAccuracy：是否要求浏览器获取最佳效果，默认为false
    },

    /**
     * 逆地址解析函数（根据坐标点获取详细地址）
     * @param {Object} point   百度地图坐标点，必传
     */
    getAddrByPoint(point) {
      var that = this;
      var geco = new BMap.Geocoder();
      geco.getLocation(point, function (res) {
        that.activeData.address = res.address;
        that.activeData.point = point;
      });
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
      this.activeData.address = item.address + item.title; //记录详细地址，含建筑物名
      this.activeData.point = item.point; //记录当前选中地址坐标
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>