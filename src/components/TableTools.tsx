import { defineComponent } from "vue";
import { useInjectTableStore } from "./useTableStoreProvider";

export default defineComponent({
  name: 'ExtendTableTools',
  setup() {

    const { handleAddTableData } = useInjectTableStore()!

    return () => (
      <div>
        <button onClick={handleAddTableData}>添加</button>
      </div>
    );
  },
})