<template>
  <el-popover placement="top-start" width="380" trigger="click">
    <el-scrollbar class="aside-scrollbar"
      ><div class="list" v-infinite-scroll="load">
        <div v-for="item in themeList" :key="item.id" class="theme">
          <img
            :class="[layoutBg === item.fileId ? 'theme-active' : '']"
            :src="define.comUrl + '/api/file/Portal/theme/' + item.fileId"
            alt=""
            @click="changeTheme(item.fileId)"
          />
          <div class="theme-name">{{ item.fullName }}</div>
        </div>
      </div>
    </el-scrollbar>
    <div slot="reference" class="change-btn">
      <img src="@/assets/images/login/edit.png" alt="" />
    </div>
  </el-popover>
</template>
<script>
import { getPortalTheme } from "@/api/onlineDev/portal.js";
export default {
  props: {
    item: { type: Object, default: () => {} },
    layoutBg: { type: String, default: "" },
  },
  data() {
    return {
      list: [],
      themeList: [],
      hasMore: true,
      currentPage: 1,
    };
  },
  watch: {
    "item.list": {
      handler(val) {
        this.list = val;
      },
      deep: true,
    },
  },
  created() {
    this.getThemeList();
  },
  methods: {
    getThemeList() {
      let param = {
        currentPage: this.currentPage,
        pageSize: 10,
      };
      getPortalTheme(param).then((res) => {
        this.themeList = this.themeList.concat(res.data.list);
        if (res.data.list.length < 10) {
          this.hasMore = false;
          return;
        }
      });
    },
    load() {
      if (this.hasMore) {
        this.currentPage++;
        this.getThemeList();
      }
    },
    changeTheme(fileId) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * 3); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "layoutBg" + "=" + fileId + ";path=/;expires=" + exdate.toGMTString();
      this.$emit("change-theme", fileId);
    },
  },
};
</script>
<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  .theme {
    width: 60px;
    height: 60px;
    margin: 0 10px 10px 0;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    &-active {
      border: 4px solid #2db7f5;
    }
    &-name {
      position: absolute;
      z-index: 100;
      bottom: 3px;
      text-align: center;
      width: 100%;
      color: #fff;
      font-size: 12px;
    }
  }
}
.change-btn {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
.change-btn:hover {
  opacity: 0.8;
}
</style>
