<template>
  <iframe
    style="width: 100%; height: 100%"
    :src="getIframeUrl"
    frameborder="0"
  ></iframe>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import {getToken, getUserAccount} from "../../../utils/auth";
export default {
  mixins: [mixin],
  data() {
    return {
      iframeUrl: "",
      param: {},
      events: [],
      showTokenType: false
    };
  },
  computed: {
    getIframeUrl() {
      let params = [];
      let token = this.showTokenType ? getToken() : getToken().split(" ")[1];
      for (let key in this.param) {
        if(this.param[key] === "${token}"){
          params.push(key + "=" + token);
        }else if(this.param[key] === "${account}"){
          params.push(key + "=" + getUserAccount());
        } else{
          params.push(key + "=" + this.param[key]);
        }
      }
      return `${this.iframeUrl}`  + "?" + params.join("&");
    }
  },
  mounted() {
    let event = this.events.find((item) => {
      return item.funName === "mounted";
    });
    if (event && event.funContext) {
      // eval(event.funContext);
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
