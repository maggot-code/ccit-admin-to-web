<template>
  <div v-if="activeData">
    <el-form-item v-if="compConfig.usePortalStyle !== undefined" label="风格">
      <el-radio-group v-model="activeData.usePortalStyle">
        <el-radio :label="true">门户统一</el-radio>
        <el-radio :label="false">自定义</el-radio>
      </el-radio-group>
    </el-form-item>
    <template v-if="!activeData.usePortalStyle">
      <el-form-item v-if="compConfig.radius !== undefined" label="边框曲率">
        <el-input type="number" v-model="activeData.radius">
          <template slot="append">px</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="compConfig.opacity !== undefined" label="透明度">
        <el-slider
          v-model="opacity"
          :min="0"
          :max="10"
          :format-tooltip="formatTooltip"
          show-stops
          style="width: 98%"
          @change="formatOpacity"
        ></el-slider>
      </el-form-item>
    </template>

    <el-divider>标题</el-divider>
    <template v-if="!activeData.usePortalStyle">
      <el-form-item
        v-if="compConfig.showBlock !== undefined"
        class="checkbox"
        label="显示"
      >
        <el-checkbox v-model="activeData.showBlock">色块</el-checkbox>
        <el-checkbox v-model="activeData.showIcon">图标</el-checkbox>
        <el-checkbox v-model="activeData.showTitle">标题</el-checkbox>
      </el-form-item>
      <el-form-item v-if="compConfig.blockColor !== undefined" label="色块">
        <el-color-picker v-model="activeData.blockColor"></el-color-picker>
        <el-input
          class="block-width"
          type="number"
          v-model="activeData.blockWidth"
        >
          <template slot="append">px</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="compConfig.titleColor !== undefined" label="换肤">
        <el-radio-group v-model="cardStyle" @change="cardStyleChange">
          <el-radio label="default">默认</el-radio>
          <el-radio label="custom">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="cardStyle === 'custom'" label="主题色">
        <div class="color-list">
          <template v-for="(item, index) in colorList">
            <el-tag
              v-show="colorTagShow(item)"
              :key="index"
              @click="changeColor(item)"
              :color="item.color"
            >
              <i
                class="el-icon-check"
                v-if="item.className === activeData.titleColor"
              ></i>
            </el-tag>
          </template>
        </div>
      </el-form-item>
    </template>

    <template v-if="!compConfig.showTabsSetting">
      <el-form-item label="标题">
        <el-input v-model="activeData.tabs[0].title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input
          clearable
          v-model="activeData.tabs[0].icon"
          placeholder="请输入图标名称"
        >
          <el-button slot="append" @click="openIconsDialog">选择</el-button>
        </el-input>
      </el-form-item>
    </template>

    <el-form-item v-if="compConfig.bgColor !== undefined" label="背景色">
      <div class="color-list">
        <template v-for="(item, index) in colorList">
          <el-tag
            v-show="colorTagShow(item)"
            :key="index"
            @click="changeBgColor(item)"
            :color="item.color"
          >
            <i
              class="el-icon-check"
              v-if="item.className === activeData.bgColor"
            ></i>
          </el-tag>
        </template>
      </div>
    </el-form-item>
    <el-form-item v-if="compConfig.titleBorder !== undefined" label="分隔线">
      <el-input v-model="activeData.titleBorder"> </el-input>
    </el-form-item>
    <el-form-item v-if="compConfig.titleCss !== undefined" label="样式">
      <el-button type="primary" @click="editStyle(index)">编辑</el-button>
    </el-form-item>
    <template v-if="compConfig.showFresh !== undefined">
      <el-divider>刷新</el-divider>
      <el-form-item label="显示刷新">
        <el-radio-group v-model="activeData.showFresh">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <template v-if="compConfig.showMore !== undefined">
      <el-divider>更多</el-divider>
      <el-form-item label="显示更多">
        <el-radio-group v-model="activeData.showMore">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="activeData.showMore" label="链接类型">
        <el-select v-model="activeData.moreType" placeholder="请选择">
          <el-option label="系统" value="sys"></el-option>
          <el-option label="外部" value="outer"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="activeData.showMore" label="链接地址">
        <el-input placeholder="请输入内容" v-model="activeData.moreUrl">
          <template slot="append">
            <el-button @click="testMoreUrl">测试</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="activeData.showMore" label="链接参数">
        <i
          class="el-icon-circle-plus-outline"
          :style="{ fontSize: '20px' }"
          @click="addParam"
        />
      </el-form-item>
      <el-table v-if="activeData.showMore" :data="paramsData">
        <el-table-column prop="key" label="键" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.key"
              v-if="scope.row.editable"
            ></el-input>
            <span v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="值" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.value"
              v-if="scope.row.editable"
            ></el-input>
            <span v-else>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.editable"
              size="mini"
              type="text"
              @click="handleAdd(scope.$index)"
              >确定</el-button
            >
            <el-button
              v-else
              size="mini"
              type="text"
              @click="handleEdit(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              class="CCIT-table-delBtn"
              @click="handleDel(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-if="showDataInterface(activeData.ccitKey)">
      <el-divider>数据</el-divider>
      <com-data-interface
        :data-interface="activeData.tabs[0].dataInterface"
        @getInterfaceData="getInterfaceData($event)"
      ></com-data-interface>
    </template>
    <template v-if="parentComp === 'onlineDev' && operator !== 'user'">
      <el-divider>展示界面</el-divider>
      <el-form-item>
        <div slot="label">
          锁定
          <el-popover
            placement="right"
            width="200"
            trigger="hover"
            content="锁定后组件无法编辑、删除、伸缩"
          >
            <i slot="reference" class="el-icon-question question" />
          </el-popover>
        </div>
        <el-switch v-model="activeData.lock"></el-switch>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-checkbox v-model="activeData.draggable">可拖拽</el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-checkbox v-if="!activeData.lock" v-model="activeData.resizable"
            >可伸缩</el-checkbox
          >
        </el-col>
        <el-col :span="8">
          <el-checkbox v-if="!activeData.lock" v-model="activeData.editable"
            >可编辑</el-checkbox
          >
        </el-col>
      </el-row>
    </template>
    <template v-if="activeData.ccitKey && activeData.resizable">
      <el-divider v-if="activeData.title !== undefined">栅格</el-divider>
      <el-form-item v-if="activeData.w !== undefined" label="宽度">
        <el-slider
          v-model="activeData.w"
          :max="activeData.maxW"
          :min="activeData.minW"
          show-stops
          :step="1"
          show-tooltip
          disabled
        />
      </el-form-item>
      <el-form-item v-if="activeData.h !== undefined" label="高度">
        <el-slider
          v-model="activeData.h"
          :max="activeData.maxH"
          :min="activeData.minH"
          show-stops
          :step="1"
          show-tooltip
          disabled
        />
      </el-form-item>
    </template>
    <style-setting
      ref="styleSetting"
      @style-submit="styleSubmit"
    ></style-setting>
    <iconBox
      :visible.sync="iconsVisible"
      :current="activeData.icon"
      @choiceIcon="setIcon"
    />
  </div>
</template>
<script>
import themeColor from "@/assets/scss/theme.scss";
import styleSetting from "@/components/VisualPortal/StyleSetting";
import iconBox from "@/components/CCIT-iconBox";
import ComDataInterface from "./DataInterface.vue";
export default {
  components: { styleSetting, iconBox, ComDataInterface },
  props: {
    activeData: {
      type: Object,
      default: () => {},
    },
    parentComp: {
      type: String,
      default: "",
    },
    compConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  inject: {
    operator: { default: "admin" },
  },
  data() {
    return {
      colorList: [
        {
          className: "blue",
          color: themeColor.blueRgbaTheme,
        },
        {
          className: "purple",
          color: themeColor.purpleRgbaTheme,
        },
        {
          className: "azure",
          color: themeColor.azureRgbaTheme,
        },
        {
          className: "ocean",
          color: themeColor.oceanRgbaTheme,
        },
        {
          className: "green",
          color: themeColor.greenRgbaTheme,
        },
        {
          className: "yellow",
          color: themeColor.yellowRgbaTheme,
        },
        {
          className: "orange",
          color: themeColor.orangeRgbaTheme,
        },
        {
          className: "red",
          color: themeColor.redRgbaTheme,
        },
      ],
      titleBorder: {
        width: 1,
        color: "",
      },
      cardStyle: "default",
      opacity: 10,
      iconsVisible: false,
      currentIndex: 0,
      paramsData: [],
    };
  },
  watch: {
    "activeData.titleColor": {
      handler(val) {
        this.cardStyle = val ? "custom" : "default";
      },
      immediate: true,
    },
    "activeData.opacity": {
      handler(val) {
        this.opacity = val * 10;
      },
      immediate: true,
    },
    paramsData(val) {
      let param = {};
      if (val.length) {
        val.forEach((item) => {
          if (item.key && item.value) {
            param[item.key] = item.value;
          }
        });
      }
      this.activeData.moreParams = param;
    },
  },
  computed: {
    colorTagShow() {
      return (item) => {
        if (!item.theme) return true;
        return item.theme === this.$store.state.settings.slideClass;
      };
    },
    showDataInterface() {
      return (ccitKey) => {
        if (this.operator === "user") {
          return false;
        }
        let arr = [
          "task",
          "rankList",
          "dataBoard",
          "timeLine",
          "modelQuery",
          "annularChart",
          "areaChart",
          "barChart",
          "lineChart",
          "pieChart",
          "radarChart",
        ];
        let index = arr.findIndex((item) => {
          return item === ccitKey;
        });
        return index > -1;
      };
    },
  },
  mounted() {
    if (this.activeData.showMore) {
      if (
        this.activeData.moreParams &&
        JSON.stringify(this.activeData.moreParams) !== "{}"
      )
        for (let key in this.activeData.moreParams) {
          this.paramsData.push({
            key: key,
            value: this.activeData.moreParams[key],
            editable: false,
          });
        }
    }
  },
  methods: {
    changeColor(item) {
      if (item.className === this.activeData.titleColor) {
        this.activeData.titleColor = "";
      } else {
        this.activeData.titleColor = item.className;
      }
    },
    changeBgColor(item) {
      if (item.className === this.activeData.bgColor) return;
      this.activeData.bgColor = item.className;
    },
    cardStyleChange(e) {
      if (e === "default") {
        this.activeData.titleColor = "";
      } else {
        this.activeData.titleColor = "blue";
      }
    },
    editStyle(index) {
      let content = this.activeData.titleCss;
      this.$refs.styleSetting.init(content);
    },
    styleSubmit(content) {
      this.activeData.titleCss = content;
    },
    formatTooltip(val) {
      return val / 10;
    },
    formatOpacity(e) {
      this.activeData.opacity = e / 10;
    },
    getInterfaceData(params) {
      switch (this.activeData.ccitKey) {
        case "todo":
        case "task":
        case "rankList":
        case "timeLine":
          this.activeData.tabs[0].dataInterface = params.dataInterface;
          this.activeData.dataInterface = params.dataInterface;
          this.activeData.list = params.data;
          break;
        case "modelQuery":
          if (
            !(params.data instanceof Object) ||
            !params.data.columns ||
            !params.data.data
          ) {
            this.$message.warning("接口返回数据与控件需要数据不匹配！");
            return;
          }
          params.data.columns.forEach((item) => {
            item.selection = true;
          });
          this.activeData.columns = params.data.columns;
          this.activeData.tabs[0].dataInterface = params.dataInterface;
          break;
        case "barChart":
          this.initBarChart(params.data, params.dataInterface);
          break;
        case "pieChart":
          this.initPieChart(params.data, params.dataInterface);
          break;
        case "lineChart":
          this.initLineChart(params.data, params.dataInterface);
          break;
        case "radarChart":
          this.initRadarChart(params.data, params.dataInterface);
        default:
          break;
      }
    },
    //初始化饼图数据
    initPieChart(data) {
      if (!data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      //设置数据
      this.activeData.option.series = [];
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      let item = data.series[0];
      let _data = item.data;
      for (let i = 0; i < _data.length; i++) {
        let color = this.randomHexColor();
        _data[i].itemStyle = { color: color };
        this.activeData.props.groupColorList.push({
          name: _data[i].name,
          color: color,
        });
        this.activeData.option.legend.data.push(_data[i].name);
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
      let seriesItem = {
        type: "pie",
        radius: "65%",
        center: ["50%", "50%"],
        selectedMode: "single",
        data: _data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      };
      this.activeData.option.series.push(seriesItem);
      console.log(this.activeData);
    },

    //初始化柱形图
    initBarChart(data, dataInterface) {
      if (!data.category || !data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置坐标值
      if (this.activeData.option.xAxis[0].type == "category") {
        this.activeData.option.xAxis[0].data = data.category;
      } else {
        this.activeData.option.yAxis[0].data = data.category;
      }
      //设置数据
      this.activeData.option.series = [];
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.activeData.option.color = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "bar",
          barWidth: "30%",
          stack: "",
          label: {
            show: false,
            position: "",
          },
          emphasis: {
            focus: "series",
          },
          data: item.data,
        };
        this.activeData.option.series.push(seriesItem);
        this.activeData.option.legend.data.push(item.name);
        //默认颜色
        let color = this.randomHexColor();
        this.activeData.props.groupColorList.push({
          name: item.name,
          color: color,
        });
        this.activeData.option.color.push(color);
        if (data.type) {
          this.activeData.option.type = data.type;
        }
      }
    },
    //初始化折线图数据
    initLineChart(data, dataInterface) {
      if (!data.category || !data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置坐标值
      if (this.activeData.option.xAxis[0].type == "category") {
        this.activeData.option.xAxis[0].data = data.category;
      } else {
        this.activeData.option.yAxis[0].data = data.category;
      }
      //设置数据
      this.$set(this.activeData.option, "series", []);
      this.$set(this.activeData.option, "color", []);
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "line",
          stack: "",
          label: {
            show: false,
            position: "",
          },
          emphasis: {
            focus: "series",
          },
          data: item.data,
          smooth: false,
          areaStyle: undefined,
        };
        this.activeData.option.series.push(seriesItem);
        this.activeData.option.legend.data.push(item.name);
        //默认颜色
        let color = this.randomHexColor();
        this.activeData.props.groupColorList.push({
          name: item.name,
          color: color,
        });
        this.activeData.option.color.push(color);
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
    },
    //初始化雷达图数据
    initRadarChart(data, dataInterface) {
      if (!data.series) {
        this.$message.warning("接口返回数据与控件需要数据不匹配！");
        return;
      }
      this.activeData.dataInterface = dataInterface;
      //设置数据
      this.$set(this.activeData.option, "series", []);
      this.$set(this.activeData.option, "color", []);
      this.activeData.option.legend.data = [];
      this.activeData.props.groupColorList = [];
      this.$set(this.activeData.option, "type", "basic");
      for (let i = 0; i < data.series.length; i++) {
        let item = data.series[i];
        let seriesItem = {
          name: item.name,
          type: "radar",
          data: item.data,
        };
        this.activeData.option.series.push(seriesItem);
        //默认颜色
        item.data.forEach((itemData) => {
          let color = this.randomHexColor();
          this.activeData.props.groupColorList.push({
            name: itemData.name,
            color: color,
          });
          this.activeData.option.color.push(color);
          this.activeData.option.legend.data.push(itemData.name);
        });
      }
      if (data.type) {
        this.activeData.option.type = data.type;
      }
    },
    randomHexColor() {
      //随机生成十六进制颜色
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    },
    openIconsDialog() {
      this.iconsVisible = true;
    },
    setIcon(val) {
      this.activeData.tabs[0].icon = val;
    },
    addParam() {
      this.paramsData.push({
        key: "",
        value: "",
        editable: true,
      });
    },
    handleAdd(index) {
      let obj = this.paramsData[index];
      if (!obj.key || !obj.value) {
        this.$message.warning("键或值不能为空");
        return;
      }
      obj.editable = false;
      this.$set(this.paramsData, index, obj);
    },
    handleEdit(index) {
      this.paramsData[index].editable = true;
    },
    handleDel(index) {
      this.paramsData.splice(index, 1);
    },
    testMoreUrl() {
      if (this.activeData.moreType === "sys") {
        let routeData = this.$router.resolve({
          path: this.activeData.moreUrl,
          query: this.activeData.moreParams,
        });
        window.open(routeData.href, "_blank");
      } else {
        let url = this.activeData.moreUrl;
        if (this.activeData.moreParams) {
          url += "?";
          for (let key in this.activeData.moreParams) {
            url += `${key}=${this.activeData.moreParams[key]}&`;
          }
          url = url.substr(0, url.length - 1);
        }
        window.open(url, "_blank");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.checkbox {
  >>> .el-checkbox {
    margin-right: 5px;
  }
}
.block-width {
  width: calc(100% - 36px);
}
.color-list {
  display: flex;
  .el-tag--small {
    width: 24px;
    padding: 0 4px;
    i {
      color: #000;
    }
  }
}
.question {
  font-size: 18px;
  margin-left: 5px;
}
</style>