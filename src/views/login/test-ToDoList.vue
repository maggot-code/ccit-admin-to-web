<template>
    <div>
        <div class="container">
            <!-- <div class="content">
                <div>
                    <div class="title"> 待办事项选项卡</div>
                    <ToDolist />
                </div>
                <div>
                    <div class="title"> 待学习事项</div>
                    <ItemsToLearn />
                </div>
            </div>
            <div class="content">
                <div>
                    <div class="title"> 会议事项</div>
                    <ItemMeettingMatters />
                </div>
                <div>
                    <div class="title"> 待阅事项</div>
                    <ItemsToRead />
                </div>
            </div> -->
            <div class="content">
                <div>
                    <div class="title"> 电子邮件</div>
                    <ItemsImaill />
                </div>
                <div>
                    
                </div>
            </div>
            <el-button type="primary" @click="openNewtarg">更多应用</el-button>

        </div>
    </div>
</template>

<script>
import ToDolist from '@/components/toDolist/toDoList.vue'
import ItemsToLearn from '@/components/toDolist/itemsToLearn.vue'
import ItemMeettingMatters from '@/components/toDolist/itemMeettingMatters.vue'
import ItemsToRead from '@/components/toDolist/itemsToRead.vue'
import ItemsImaill from '@/components/toDolist/itemsImaill.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        ToDolist,
        ItemsToLearn,
        ItemMeettingMatters,
        ItemsToRead,
        ItemsImaill
    },
    methods: {
        openNewtarg() {
            window.open("http://oam.chinacoal.com/webcenter/portal/chinacoal_portal/newlink7")
        }
    }

}
</script>

<style lang="scss" scoped>
.container {
    background: #5d74c4;
    min-height: 1000px;
}
.content {
    width: 1033px;
    margin: auto;
    display: flex;
    justify-content: space-between;
}
.title {
    color: #ffffff;
    font-size: 18px;
    margin: 20px;
}
</style>