import { ref, reactive } from 'vue';

// 将分页相关数据聚合到一起，防止分页相关属性、方法在 setup 写法时排列混乱
export const usePagination = ({defaultPageSize = 10, sizeChange, currentChange }) => {
  const pageIndex = ref(1);
  const pageSize = ref(defaultPageSize); // 默认分页大小为 10
  const tableDataObject: any = reactive({
    list: [],
    total: 0
  })

  const resetPage = (clearList = true) => {
    pageIndex.value = 1;
    // 防止 tab 切换或搜索条件变更后，接口加载失败，数据错位问题，初始化为 []
    if (clearList) {
      tableDataObject.list = [] // fix 分页会闪一下问题
      tableDataObject.total = 0
    }
  }

  const pageSizeChange = () => {
    // pageSize 分页组件会自动改变（v-model语法糖触发的事件）
    pageIndex.value = 1; // 需要手动设置到第一页
    sizeChange && sizeChange()
  }

  const pageIndexChange = () => {
    // pageIndex 会自动修改
    typeof currentChange === 'function' && currentChange()
  }

  return {
    pageIndex,
    pageSize,
    resetPage,
    tableDataObject,

    // 从参数获取再暴露到外部
    pageSizeChange,
    pageIndexChange
  }
}