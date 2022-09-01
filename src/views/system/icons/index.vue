<template>
  <div class="CCIT-common-layout icons-container">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="图标名称">
              <el-input
                v-model="keyword"
                placeholder="请输入图标名称"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t("common.search") }}</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >{{ $t("common.reset") }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <el-tabs type="border-card" class="CCIT-el_tabs" v-model="activeName">
          <el-tab-pane label="ccit-icon 图标">
            <el-row>
              <el-col
                :span="6"
                v-for="(item, i) of ymIconsList"
                :key="i"
                @click.native="
                  handleClipboard(generateYmIconCode(item), $event)
                "
                class="icon-item"
              >
                <i :class="generateYmIconCode(item)" />
                <span>{{ item }}</span>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Element-UI 图标">
            <el-row>
              <el-col
                :span="6"
                v-for="(item, i) of elementIconsList"
                :key="i"
                @click.native="handleClipboard(item, $event)"
                class="icon-item"
              >
                <i :class="item" />
                <span>{{ item }}</span>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="ccit-custom 图标">
            <el-row>
              <el-col
                :span="6"
                v-for="(item, i) of ymCustomList"
                :key="i"
                @click.native="
                  handleClipboard(generateYmCustomCode(item), $event)
                "
                class="icon-item"
              >
                <i :class="generateYmCustomCode(item)" />
                <span>{{ item }}</span>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="ccit-mobile 图标">
            <el-row>
              <el-col
                :span="6"
                v-for="(item, i) of ymMobileList"
                :key="i"
                @click.native="
                  handleClipboard(generateYmMobileCode(item), $event)
                "
                class="icon-item"
              >
                <svg class="ym-mobile" aria-hidden="true">
                  <use :xlink:href="'#' + item"></use>
                </svg>
                <span>{{ item }}</span>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import elementIconsJson from "static/json/element-icons.json";
import ymIconsJson from "static/json/ymIcon.json";
import ymCustomJson from "static/json/ymCustom.json";
import ymMobileJson from "static/json/ymMobile.json";
const ymIcons = ymIconsJson.glyphs.map((o) => `icon-ym-${o.font_class}`);
const ymCustom = ymCustomJson.glyphs.map((o) => `ym-custom-${o.font_class}`);
const ymMobile = ymMobileJson.glyphs.map((o) => `ym-mobile-${o.font_class}`);
const elementIcons = elementIconsJson.map((name) => `el-icon-${name}`);

export default {
  name: "system-icons",
  data() {
    return {
      elementIcons,
      ymIcons,
      ymCustom,
      ymMobile,
      ymIconsList: [],
      ymCustomList: [],
      ymMobileList: [],
      elementIconsList: [],
      keyword: "",
      activeName: "",
    };
  },
  watch: {
    activeName(val) {
      if (this.keyword) {
        this.keyword = "";
      } else {
        this.search();
      }
    },
    // keyword(val) {
    //   this.search()
    // }
  },
  methods: {
    search() {
      let key = "";
      if (this.activeName == "0") {
        key = "ymIcons";
      } else if (this.activeName == "1") {
        key = "elementIcons";
      } else if (this.activeName == "2") {
        key = "ymCustom";
      } else if (this.activeName == "3") {
        key = "ymMobile";
      }
      if (this.keyword) {
        this[key + "List"] = this[key].filter(
          (o) => o.indexOf(this.keyword) > -1
        );
      } else {
        this[key + "List"] = this[key];
      }
    },
    reset() {
      this.keyword = "";
      this.search();
    },
    generateYmIconCode(symbol) {
      return `icon-ym ${symbol}`;
    },
    generateYmCustomCode(symbol) {
      return `ym-custom ${symbol}`;
    },
    generateYmMobileCode(symbol) {
      return `<svg class="ym-mobile" aria-hidden="true">\n<use xlink:href="#${symbol}"></use>\n</svg>`;
    },
    handleClipboard(text, event) {
      clipboard(text, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.icons-container {
  .CCIT-common-layout-main {
    padding: 0;
  }
  .icon-item {
    padding: 0 10px;
    height: 40px;
    line-height: 38px;
    border: 1px dashed transparent;
    color: #6b7a99;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    i {
      font-size: 16px;
      line-height: 40px;
      margin-right: 14px;
      vertical-align: top;
    }
    svg {
      width: 16px;
      height: 16px;
      margin-right: 14px;
      vertical-align: middle;
    }
    span {
      line-height: 40px;
      vertical-align: top;
    }
    &:hover {
      border-color: #188ae2;
      i {
        font-size: 30px;
      }
    }
  }

  span {
    font-size: 14px;
  }

  .disabled {
    pointer-events: none;
    margin-right: 14px;
  }
}
</style>