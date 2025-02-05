<script setup lang="ts">

import { Management, Promotion, UserFilled, User, Key, Comment } from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '@/router';

const indexCommand = () => {
  router.push('/')
}

const listCommand = () => {
  router.push('/markdown/list')
}

// const contentCommand = () => {
//   router.push('/markdown/content')
// }

const testCommand = () => {

}

</script>
<template>

  <el-aside width="200px">
    <img src="@/assets/images/white-logo-react.png" class="logo">

    <el-menu active-text-color="#ffd04b" background-color="#000000" text-color="#fff" style="border: 0; ">
      <el-menu-item @click="indexCommand" index="1">
        <el-icon>
          <Management />
        </el-icon>
        <span>返回首页</span>
      </el-menu-item>
      <!-- 

      <el-menu-item @click="contentCommand" index="2">
        <el-icon>
          <Comment />
        </el-icon>
        <span>Markdown</span>
      </el-menu-item> -->

      <el-menu-item @click="listCommand">
        <el-icon>
          <Comment />
        </el-icon>
        <span>查看列表</span>
      </el-menu-item>

      <el-menu-item @click="testCommand">
        <el-icon>
          <Comment />
        </el-icon>
        <span>评论留言</span>
      </el-menu-item>




      <el-sub-menu index="5">
        <template #title>
          <el-icon>
            <UserFilled />
          </el-icon>
          <span>个人资料</span>
        </template>
        <el-menu-item disabled="true" @click="testCommand" index="5.1">
          <el-icon>
            <User />
          </el-icon>
          <span>基本资料</span>
        </el-menu-item>

        <el-menu-item disabled="true" @click="testCommand" index="5.2">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>我的反馈</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>

</template>


<style lang="scss" scoped>
.el-aside {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
}

.logo {
  padding: 1.5vh;
  width: 11rem;
}
</style>