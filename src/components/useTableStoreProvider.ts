import { createInjectionState } from "@vueuse/core";
import { computed, nextTick, ref, watch } from "vue";

export type TableDataItem = {
  name: string;
  index: number;
};


function hookInputEvents() {
  // 
  console.log('input')
}

const [useProviderTableStore, useInjectTableStore] = createInjectionState(
  () => {

    const events = {
      input: hookInputEvents
    }

    const tableData = ref<TableDataItem[]>([]);
    const tableColumns = ref([
      {
        type: "seq",
        title: "序号",
        width: 80,
        align: "center",
        fixed: "left",
      },
      {
        field: "name",
        title: "名称",
        cellRender: {
          name: 'ExtendInput',
          attrs: {
            placeholder: "请输入名称"
          },
          props: {
            value: '',
            xyz: 'good!',
            desc: {
              type: 'ExtendInput'
            }
          },
          events
        }
      },
    ]);
    const tablePageOptions = ref({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    const pageTableData = ref<TableDataItem[]>([]);
    const cacheTablePageDataLength = ref(-1);
    const isUpdateTableData = ref(false);

    const getTablePageOptions = computed(() => {
      return Object.assign({}, tablePageOptions.value, {
        total: tableData.value.length
      });
    });

    watch(
      () => tableData.value,
      (v) => {
        // 进行分页处理
        getPageTableData();
      },
      {
        immediate: true,
        deep: true,
      }
    );

    function pageCount(isPager: boolean) {
      const { pageSize } = tablePageOptions.value;
      const pageCount = Math.ceil(tableData.value.length / pageSize);
      const current = isPager ? tablePageOptions.value.current : pageCount;
      const startIndex = (current - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return {
        current,
        startIndex,
        endIndex,
      };
    }
    function getPageTableData(isPager = false) {
      const { startIndex, endIndex, current } = pageCount(isPager);
      const isChangeTable =
        cacheTablePageDataLength.value !== tableData.value.length;
      if (isChangeTable || isPager || isUpdateTableData.value) {
        pageTableData.value = tableData.value.slice(startIndex, endIndex);
        tablePageOptions.value.current = current;
      } else if (!isPager) {
        pageTableData.value;
      }
      nextTick(() => {
        cacheTablePageDataLength.value = tableData.value.length;
        isUpdateTableData.value = false;
      });
    }

    function handleAddTableData() {
      //
      tableData.value.push({
        name: "123" + Math.random(),
        index: tableData.value.length
      });
    }

    function handleTablePageChange({
      currentPage,
      pageSize,
    }: any) {
      tablePageOptions.value.current = currentPage;
      tablePageOptions.value.pageSize =
        pageSize ?? tablePageOptions.value.pageSize;
      getPageTableData(true);
    }

    return {
      tablePageOptions: getTablePageOptions,
      tableColumns,
      storeFilterTableData: pageTableData,
      handleAddTableData,
      handleTablePageChange,
    };
  }
);

export { useInjectTableStore, useProviderTableStore };
