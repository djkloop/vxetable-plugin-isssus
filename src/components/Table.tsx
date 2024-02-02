/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from "vue";
import { Grid, Table } from "vxe-table";
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

    function renderScopedSlots() {
      const scopedSlots = {
        default: (options: any) => {
          return (
              <extend-input
                key={`${options.column.field}_${options.$rowIndex}_${options.$columnIndex}_${options.row.index}`} 
                colIndex={options.$columnIndex} 
                rowIndex={options.$rowIndex}
              />
          )
        }
      }

      return scopedSlots;
    }

    return () => (
      <div>
        <ExtendTableTools />
          {/* <Grid
            maxHeight={500}
            minHeight='60px'
            data={ storeFilterTableData.value }
            columns={ tableColumns.value }
            scopedSlots={renderTableScopedSlots()}
          >
          </Grid> */}
          <Table
            data={ storeFilterTableData.value }
            scopedSlots={renderTableScopedSlots()}
            maxHeight={500}
            minHeight='60px'
          >
            <vxe-column type="seq" title="序号" />
            <vxe-column 
              field="name" 
              title="姓名" 
              scopedSlots={renderScopedSlots()}
            />
          </Table>
          {
            renderScopedPagerSlot()
          }
      </div>
    )
  }
})