/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnCellRenderParams, ColumnEditRenderParams, RenderOptions, RenderParams, VXETableCore } from "vxe-table";
import { assign, objectEach } from "xe-utils";

function getModelProp() {
  return "value";
}

function getModelEvent() {
  return "input";
}

function getChangeEvent() {
  const baseEvent = "input";

  // 因为eleForm内置了input事件所以不在监听组件的change事件,防止二次触发change事件
  // if (isEleFormInput(renderOpts.name) || isEleFormInputNumber(renderOpts.name)) {
  //   baseEvent = "input";
  // }

  // if (isEleFormAutocomplete(renderOpts.name)) {
  //   baseEvent = "select";
  // }

  return baseEvent;
}

function getTableBaseData() {
  return "data";
}

function createEvents() {
  return Object.create(null);
}


// 解析vue on事件
function getVOns(renderOpts: RenderOptions, renderParams: RenderParams, innerInputFunc?: any, innerChangeFunc?: any) {
  const { events } = renderOpts;
  const modelEvent = getModelEvent();
  const changeEvent = getChangeEvent();
  const isSameEvent = modelEvent === changeEvent;
  // 收集on事件
  const onEvents = createEvents();
  // 触发事件
  objectEach(events, (func, key: string) => {

    onEvents[key] = function(...args: any[]) {
      func(renderParams, args);
    };
  });
  // 如果有双向绑定事件
  if (innerInputFunc) {
    onEvents[modelEvent] = function(targetEvent: any) {
      innerInputFunc(targetEvent);
      if (events?.[changeEvent]) {
        events[modelEvent](renderParams, targetEvent);
      }
    };
  }

  // 如果有change事件 不同组件可能不一致
  if (!isSameEvent && innerChangeFunc) {
    onEvents[changeEvent] = function(...args: any[]) {
      innerChangeFunc(...args);
    };
  }

  return onEvents;
}

// 解析defaultRender VOn 事件
function getDefaultVOns(renderOpts: RenderOptions, renderParams: ColumnEditRenderParams) {
  const { $table, row, column } = renderParams;
  return getVOns(renderOpts, renderParams, (val: any) => {
    // 这里一定要用Object.assign不要用vue的set，要不然不会触发组件里面的formMixin里面的watch
    Object.assign(row, {
      [column.field]: {
        data: val,
        sysData: row[column.field].sysData
      }
    }
    );
  }, () => {
    $table.updateStatus(renderParams);
  });
}

// merge props
function getCellEditFilterProps(renderOpts: RenderOptions, params: ColumnCellRenderParams, value: any, defaultProps?: { [prop: string]: any }) {
  const { vSize } = params.$table;

  // 修正props错误
  Object.assign(renderOpts.props as any, {
    divIndex: params.$rowIndex,
  });

  return assign(vSize ? { size: vSize } : {}, defaultProps, renderOpts.props, { [getModelProp()]: value }, { vxeColumnIndex: params.$columnIndex, vxeRowIndex: params.$rowIndex });
}

function getCellDescProps(renderOpts: RenderOptions) {
  const { props } = renderOpts;
  const { desc } = props as any;
  return desc;
}

// vue2 jsx -> props / attrs / on / nativeOn / class / style / slot / scopeSlot
// vue2 template -> props / attrs / $listeners / class / style / slot / scopeSlot
function createDefaultRender(defaultProps?: { [key: string]: any }) {
  return function(_: any, renderOpts: any, params: any) {
    const { row, column, $rowIndex, $columnIndex } = params;
    const { attrs } = renderOpts;
    const cellValue = row[column.field][getTableBaseData()];

    const dynamicOptions = {
      attrs,
      props: getCellEditFilterProps(renderOpts, params, cellValue, defaultProps),
      on: getDefaultVOns(renderOpts, params)
    };

    const desc = getCellDescProps(renderOpts);
    const rowData = row[column.field];

    return (
      <keep-alive>
        <div data-validate-x={$rowIndex}  data-validate-field={column.field} class={[`vxe-render-${desc.type}`]}>
          <renderOpts.name key={`${column.field}_${$rowIndex}_${$columnIndex}`} colIndex={$columnIndex} rowIndex={$rowIndex}  {...dynamicOptions}  class={["vxeTableCellComponent", rowData?.__isError__ && "vxeTableCellComponentError"]}></renderOpts.name>
        </div>
      </keep-alive>
    );
  };
}


export const VXETableExtendRenderPlugin = {
  install(vxeTable: VXETableCore) {
    // 检查版本
    if (!/^(2|3)\./.test(vxeTable.version)) {
      console.error("[vxe-table-extend-render-plugin] Version vxe-table 3.x is required");
    }

    // 注册extendForm组件
    const extendFormComponents: any = {};
    ['ExtendInput'].forEach((component: any) => {
      extendFormComponents[component] = {
        renderDefault: createDefaultRender()
      };
    });
    vxeTable.renderer.mixin(extendFormComponents);
  }
};
