<!--
 * @FilePath: \ccit-admin-to-web\src\views\test\toggle.vue
 * @Author: zhangxin
 * @Date: 2022-09-06 16:34:49
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-09-07 14:55:06
 * @Description: 
-->
<template>
    <div class="toggle">
        <div class="toggle-form-outer">
            <el-link
                v-if="isShowPlace"
                icon="icon-ym icon-ym-nav-prev"
                class="icon-left"
                :underline="false"
                @click="moveLocation('left')"
            />
            <div class="toggle-form-inlayer" ref="toggleRefs">
                <slot name="toggle-form"></slot>
            </div>
            <el-link
                v-if="isShowPlace"
                @click="moveLocation('right')"
                icon="icon-ym icon-ym-nav-next"
                class="icon-right"
                :underline="false"
            />
        </div>

        <div class="toggle-btn">
            <slot name="toggle-btn"></slot>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api";
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: "toggle",
    //混入
    mixins: [],
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {},
    setup(props, context) {
        const toggleRefs = ref();
        const isShowPlace = ref(false);
        const moveLocation = (place) => {
            toggleRefs.value.scrollLeft =
                place === "left"
                    ? toggleRefs.value.scrollLeft - (toggleRefs.value.clientWidth - 200)
                    : toggleRefs.value.scrollLeft + (toggleRefs.value.clientWidth - 200);
        };
        onMounted(() => {
            isShowPlace.value = toggleRefs.value.scrollWidth !== toggleRefs.value.clientWidth;
        });
        return { moveLocation, toggleRefs, isShowPlace };
    }
};
</script>
<style lang='scss' scoped>
@import "./toggle.scss";
</style>