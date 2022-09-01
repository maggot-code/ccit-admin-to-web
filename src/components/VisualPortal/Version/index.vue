<template>
  <div>
    <div class="login-version" @click="dialogVisible = true">
      <p class="login-version-text">{{ $t("login.version") }} {{ version }}</p>
    </div>
    <el-dialog
      title="更新日志"
      :visible.sync="dialogVisible"
      width="35%"
      append-to-body
    >
      <div class="log">
        <div v-for="item in log" :key="item.id">
          <div class="version">
            <div class="icon"></div>
            <span class="text">{{ item.f_version }}</span>
            <el-tag
              class="tag"
              v-if="item.f_important === '是'"
              type="primary"
              effect="plain"
            >
              重要更新
            </el-tag>
            <el-tag class="date" type="info" effect="plain">{{
              item.f_createdate | formatDate
            }}</el-tag>
          </div>
          <div class="content">
            <ul class="text">
              <li v-for="(describe, index) in item.desList" :key="index">
                {{ describe }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getModelList } from "@/api/onlineDev/visualDev";
import { getSysInfoVal } from "@/api/system/sysConfig";
export default {
  data() {
    return {
      version: "",
      dialogVisible: false,
      log: [],
    };
  },
  filters: {
    formatDate(date) {
      return date.substr(0, 10);
    },
  },
  created() {
    getSysInfoVal("sysVersion").then((res) => {
      this.version = res.data.value;
    });
  },
  mounted() {
    this.getLog();
  },
  methods: {
    getLog() {
      getModelList("1b4e1e57dc564fbca9a3385ff755b01e", {
        currentPage: 1,
        pageSize: 100,
        sort: "desc",
      }).then((res) => {
        res.data.list.forEach((item) => {
          item.desList = item.f_describe.split(";");
        });
        this.log = res.data.list;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-version {
  position: fixed;
  top: -11px;
  right: -11px;
  width: 94px;
  height: 94px;
  background: url("../../../assets/images/login_version.png") no-repeat center;
  background-size: 100%;
  &-text {
    width: 94px;
    height: 94px;
    line-height: 52px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    transform: rotate(45deg);
    cursor: pointer;
  }
}
.login-content {
  width: 70%;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .login-img {
    width: 750px;
    height: 500px;
  }
}
.log {
  height: 350px;
  overflow: auto;
  padding: 10px;
  .version {
    display: flex;
    align-items: center;
    height: 30px;
    .icon {
      border-color: #39f;
      color: #39f;
      border: 1px solid #39f;
      border-radius: 50%;
      width: 13px;
      height: 13px;
      background-color: #fff;
      margin-right: 10px;
    }
    .text {
      font-size: 20px;
      font-weight: 400;
      color: #657180;
    }
    .tag {
      left: 110px;
      top: -2px;
      margin-left: 10px;
      font-weight: bold;
    }
    .date {
      margin-left: auto;
    }
  }
  .content {
    padding: 10px 30px;
    .text {
      margin: 10px 0 0 20px;
      li {
        margin: 10px 0;
      }
    }
  }
}
</style>