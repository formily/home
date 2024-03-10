<template>
  <div class="list-page-main">
    <h2 class="lpm-title">低代码配置列表</h2>
    <div class="lpm-content">
      <div class="lpm-content-top">
        <el-button type="primary" @click="addConfig">新建</el-button>
      </div>
      <el-table v-loading="loading" :data="tableDataObject.list">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="id" label="ID">
          <template #default="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="180">
          <template #default="scope">
            <el-button type="primary" text @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="primary" text @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div v-if="tableDataObject.list.length" class="pagination-footer">
        <el-pagination
          v-model:currentPage="pageIndex"
          v-model:pageSize="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total,prev,pager,next,sizes,jumper"
          :total="tableDataObject.total"
          background
          @size-change="pageSizeChange"
          @current-change="pageIndexChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePagination } from "../composition/use-pagination";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";

const loading = ref(false);

async function findPage() {
  loading.value = true;
  const payload = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
  };
  try {
    console.log(JSON.stringify(payload, null, 2));
    await new Promise((r) => setTimeout(r, 500));
    // const res = await apiGetList(payload)
    const res = { list: [{}, {}], total: 100 };
    tableDataObject.list = res.list;
    tableDataObject.total = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

const {
  pageIndex,
  pageSize,
  tableDataObject,
  resetPage,
  pageSizeChange,
  pageIndexChange,
} = usePagination({
  defaultPageSize: 20,
  sizeChange: () => findPage(),
  currentChange: () => findPage(),
});

onMounted(() => {
  findPage();
});

function handleEdit(row: any) {
  console.log("edit", row);
}
async function handleDelete(row: any) {
  try {
    const title = "提示";
    const msg = "您确认要删除吗？";
    const options: any = { type: "info" };
    await ElMessageBox.confirm(msg, title, options);
    loading.value = true;
    // const res = await apiGetList({ id: row.id })
    await new Promise((r) => setTimeout(r, 500));
    findPage();
    ElMessage.success("删除成功!");
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}

function addConfig() {
  function generateId() {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let id = "";
    for (let i = 0; i < 16; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  // 生成一个 16 位的随机 ID
  let randomId = generateId();
  console.log(randomId);
  //   window.open(`http://127.0.0.1:3000?bid=${randomId}`, "_blank");
  window.open(`http://design.formily.top?bid=${randomId}`, "_blank");
}
</script>

<style lang="scss" scoped>
.lpm-title {
  margin: 0 0 20px;
  padding-top: 20px;
  color: #262626;
  font-size: 18px;
  font-weight: bold;
  line-height: 24px;
}

.lpm-content {
  border-radius: 8px;
  //   padding: 20px;
  //  box-sizing: border-box;
  //   width: calc(100% - 40px);
  min-height: 500px;
  margin: 0 auto 20px;
  background: #fff;
  // box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.05);
  .lpm-content-top {
    margin-bottom: 20px;
  }
}

.pagination-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

:deep(table.el-table__header) {
  margin: 0;
}
:deep(table.el-table__body) {
  margin: 0;
}
</style>
