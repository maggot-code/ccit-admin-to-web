<template>
  <div id="he-plugin-standard"></div>
</template>
<script>
import erd from "element-resize-detector";
export default {
  data() {
    return {};
  },
  methods: {
    init(h ,w) {
      //和风天气插件调用
      window.WIDGET = {
        CONFIG: {
          layout: "1",
          background: "1",
          dataColor: "FFFFFF",
          borderRadius: "5",
          key: "0a4ad062007848e78b99365df3086048",
          width: w,
          height: h
        },
      };
      (function (d) {
        var c = d.createElement("link");
        c.rel = "stylesheet";
        c.href =
          "https://widget.heweather.net/standard/static/css/he-standard.css?v=1.4.0";
        var s = d.createElement("script");
        s.src =
          "https://widget.heweather.net/standard/static/js/he-standard.js?v=1.4.0";
        var sn = d.getElementsByTagName("script")[0];
        sn.parentNode.insertBefore(c, sn);
        sn.parentNode.insertBefore(s, sn);
      })(document);
    },
  },
  mounted() {
    setTimeout(() => {
      let el = document.getElementById('he-plugin-standard');
      let parentNode = document.getElementById('he-plugin-standard').parentNode;
      let h =  parentNode.offsetHeight;
      let w = parentNode.offsetWidth;
      this.init(h, w)
      erd().listenTo(parentNode, element => {
        this.$nextTick(() => {
          console.log(element.offsetHeight)
          el.style.height = element.offsetHeight + 'px';
          el.style.width = element.offsetWidth + 'px';
        });
      });
    }, 200);
  }
};
</script>
