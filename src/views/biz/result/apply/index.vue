<!--
 * @FilePath: \ccit-admin-to-web\src\views\biz\result\apply\index.vue
 * @Author: maggot-code
 * @Date: 2022-09-05 11:15:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-09-05 11:35:39
 * @Description: 
-->
<template>
    <div class='result-apply'>成果 - 作者申请</div>
</template>

<script>

import { useResultApply } from "@bff/result/apply";
export default {
    name: 'BizResultApply',
    mixins: [],
    components: {},
    props: {},
    setup(props, { root }) {
        useResultApply(root.$route.query.modelId);
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() { },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
</style>
