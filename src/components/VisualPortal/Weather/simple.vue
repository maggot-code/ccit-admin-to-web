<template>
  <div id="he-plugin-simple"></div>
</template>
<script>
import erd from "element-resize-detector";
export default {
  methods: {
    init(h ,w) {
      window.WIDGET = {
        CONFIG: {
          modules: "01234",
          background: "1",
          tmpColor: "FFFFFF",
          tmpSize: "16",
          cityColor: "FFFFFF",
          citySize: "16",
          aqiColor: "FFFFFF",
          aqiSize: "16",
          weatherIconSize: "24",
          alertIconSize: "18",
          padding: "10px 10px 10px 10px",
          shadow: "0",
          language: "auto",
          fixed: "false",
          vertical: "top",
          horizontal: "left",
          key: "6d466980de0246d6af6987d7ab9403cd",
        },
      };
      (function (d) {
        var c = d.createElement("link");
        c.rel = "stylesheet";
        c.href =
          "https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0";
        var s = d.createElement("script");
        s.src =
          "https://widget.heweather.net/simple/static/js/he-simple.js?v=1.4.0";
        var sn = d.getElementsByTagName("script")[0];
        sn.parentNode.insertBefore(c, sn);
        sn.parentNode.insertBefore(s, sn);
      })(document);
    },
  },
  mounted() {
    setTimeout(() => {
      // let el = document.getElementById('he-plugin-simple');
      // let parentNode = document.getElementById('he-plugin-simple').parentNode;
      // let h =  parentNode.offsetHeight;
      // let w = parentNode.offsetWidth;
      // this.init(h, w)
      this.init()
      // erd().listenTo(parentNode, element => {
      //   this.$nextTick(() => {
      //     console.log(element.offsetHeight)
      //     el.style.height = element.offsetHeight + 'px';
      //     el.style.width = element.offsetWidth + 'px';
      //   });
      // });
    }, 200);
  },
};
</script>