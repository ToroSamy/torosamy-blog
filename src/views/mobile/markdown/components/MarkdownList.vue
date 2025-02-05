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
  markdownSize: 9,
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


const getMarkdownListChange = (pageIndex: number) => {
  loading.value = true

  // 使用 markdownSize 作为每页的数据数量
  const startIndex = (pageIndex - 1) * params.value.markdownSize
  const endIndex = startIndex + params.value.markdownSize > markdownList.value.length
    ? markdownList.value.length
    : startIndex + params.value.markdownSize

  markdownShowList.value = []

  // 通过 startIndex 和 endIndex 获取当前页的数据
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
    <el-table :data="markdownShowList" v-loading="loading">
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
    :total="params.markdownNumber" layout="prev, pager, next" @current-change="onCurrentChange"
    class="pagination-container" />
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #1e1e1e;
  /* 深灰色背景 */
  color: white;
  min-height: 90%;
  box-sizing: border-box;
  border-radius: 8px;
  /* 圆角 */
  padding: 20px;
}

.pagination-container {
  justify-content: flex-end;
  --el-color-primary: rgb(74, 73, 73);
  align-content: flex-end;
  color: white;
  margin-top: 1%
}

.el-table {
  --el-table-border-color: transparent;
  --el-table-border: none;
  --el-table-text-color: white;
  --el-table-header-text-color: white;
  --el-table-row-hover-bg-color: transparent;
  --el-table-current-row-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-expanded-cell-bg-color: transparent;

  @media (prefers-color-scheme: light) {
    --el-table-text-color: rgb(217, 217, 217);
    --el-table-header-text-color: rgb(217, 217, 217);
  }
}
</style>
