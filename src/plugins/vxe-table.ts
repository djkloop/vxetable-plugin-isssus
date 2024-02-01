// vxe-table
import Vue from "vue";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import { VXETableExtendRenderPlugin } from "./vxeTablePlugin";

Vue.use(VXETable);
// 设置vxe的全局zIndex防止其它组件遮挡tooltip
VXETable.setup({
  zIndex: 3000
});

VXETable.use(VXETableExtendRenderPlugin);
