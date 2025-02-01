<script setup lang="ts">
import { ref } from 'vue'
import { sendMarkdownContentService, sendMarkdownNamesService } from '@/api/markdown'
import { useMarkdownStore } from '@/stores'
import router from '@/router';
const loading = ref(false)
const markdownStore = useMarkdownStore()

const markdownList = ref([])
const markdownShowList = ref([])
const params = ref({
  pageIndex: 1,
  markdownSize: 12,
  markdownNumber: 0
})
const getMarkdownList = async () => {
  loading.value = true
  const res = await sendMarkdownNamesService()
  markdownList.value = res.data.data
  params.value.markdownNumber = markdownList.value.length;
  loading.value = false


  onCurrentChange(1)
}
getMarkdownList()


const getMarkdownListChange = (pageInde: number) => {
  loading.value = true

  const startIndex = (pageInde - 1) * 11
  const endIndex = startIndex + 11 > markdownList.value.length ? markdownList.value.length : startIndex + 11

  markdownShowList.value = []

  for (let i = startIndex; i < endIndex; i++) {
    markdownShowList.value.push(markdownList.value.at(i))
  }
  loading.value = false
}


const onCurrentChange = (page: number) => {
  params.value.pageIndex = page
  getMarkdownListChange(page)
}


const lookCommand = async (row: any, $index: number) => {
  const result = await sendMarkdownContentService(row)
  markdownStore.setMarkdownContent(result.data.data)
  markdownStore.setMarkdownName(row)
  router.push('/markdown/content')

}

</script>

<template>
  <el-card class="page-container">
    <el-table :data="markdownShowList" style="width: 100%;" v-loading="loading">
      <el-table-column label="序号" type="index" width="60"></el-table-column>

      <el-table-column label="Markdown">
        <template #default="{ row }">
          {{ row }}
        </template>
      </el-table-column>


      <el-table-column label="操作" width="200">
        <template #default="{ row, $index }">
          <el-button type="primary" @click="lookCommand(row, $index)">预览</el-button>
        </template>
      </el-table-column>


      <template #empty>
        <el-empty description="没有找到任何数据"></el-empty>
      </template>


    </el-table>
  </el-card>


  <!-- 页码 -->
  <el-pagination v-model:currentPage="params.pageIndex" v-model:page-size="params.markdownSize" :background="true"
    :total="params.markdownNumber" layout="prev, pager, next" @current-change="onCurrentChange" style="justify-content: flex-end; 
    align-content: flex-end; 
    margin-top: 1%" />


</template>

<style lang="scss" scoped>
.page-container {
  min-height: 90%;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
