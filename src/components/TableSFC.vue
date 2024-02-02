<template>
  <div>
    <ExtendTableTools />
    <keep-alive>

    <vxe-table
      :data="storeFilterTableData"
      maxHeight="500"
      minHeight="60px"
    >
      <vxe-column type="seq" title="序号" />
      <vxe-column 
        field="name" 
        title="姓名" 
      >
        <template #default="options">
          <component 
            :is="'extend-input'"
            :key='`${options.column.field}_${options.$rowIndex}_${options.$columnIndex}_${options.row.index}`'
            :colIndex='options.$columnIndex'
            :rowIndex='options.$rowIndex'
          />
          <!-- <extend-input
            :key='`${options.column.field}_${options.$rowIndex}_${options.$columnIndex}_${options.row.index}`'
            :colIndex='options.$columnIndex'
            :rowIndex='options.$rowIndex'
          /> -->
        </template>
      </vxe-column>
    </vxe-table>
  </keep-alive>

    <div>
      <vxe-pager
        background
        :layouts='["Sizes", "PrevJump", "PrevPage", "Number", "NextPage", "NextJump", "FullJump", "Total"]'
        :currentPage="tablePageOptions.current"
        :pageSize="tablePageOptions.pageSize"
        :total="tablePageOptions.total"
        @page-change="handleTablePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProviderTableStore } from './useTableStoreProvider';
import ExtendTableTools from "./TableTools"

  const { 
    storeFilterTableData,
    tablePageOptions,
    handleTablePageChange
  } = useProviderTableStore()
</script>

<style scoped>

</style>