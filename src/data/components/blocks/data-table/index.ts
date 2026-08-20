import { dataTableMeta } from "./meta";
import code from "./CustomDataTable.tsx?raw";
import codeJs from "./CustomDataTable.tsx?jsx-raw";
import { dataTableExamples, type OrderRow } from "./examples";
import { CustomDataTable, CustomDataTableProps } from "./CustomDataTable";
import { ComponentInfo } from "@/types/component.types";

const dataTableComponent: ComponentInfo<CustomDataTableProps<OrderRow>> = {
  id: "data-table",
  Component: CustomDataTable,
  ...dataTableMeta,
  code,
  codeJs,
  examples: dataTableExamples,
};

export default dataTableComponent;
