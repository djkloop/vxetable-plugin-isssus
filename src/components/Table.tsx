import { defineComponent } from "vue";
import { Grid } from "vxe-table";
import "@/plugins/vxe-table";
import { useProviderTableStore } from "./useTableStoreProvider";
import ExtendTableTools from "./TableTools"

export default defineComponent({
  name: "ExtendTable",
  setup() {

    const { 
      storeFilterTableData,
      tableColumns,
      tablePageOptions,
      handleTablePageChange
    } = useProviderTableStore()

    // 渲染分页
    function renderScopedPagerSlot() {
      return (
        <div>
          <vxe-pager
            background
            layouts={["Sizes", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "FullJump", "Total"]}
            currentPage={tablePageOptions.value.current}
            pageSize={tablePageOptions.value.pageSize}
            total={tablePageOptions.value.total}
            on-page-change={handleTablePageChange}
          />
        </div>
      );
    }

    // 渲染表格的scopedSlots
    function renderTableScopedSlots() {
      const scopedSlots = {
        pager: () => renderScopedPagerSlot()
      };
      return scopedSlots;
    }

    return () => (
      <div>
        <ExtendTableTools />
        <Grid
          maxHeight={500}
          minHeight='60px'
          data={ storeFilterTableData.value }
          columns={ tableColumns.value }
          scopedSlots={renderTableScopedSlots()}
        >
        </Grid>
      </div>
    )
  }
})