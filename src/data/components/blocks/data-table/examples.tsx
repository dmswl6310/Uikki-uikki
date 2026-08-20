import { CustomDataTableProps, DataTableColumn } from "./CustomDataTable";

export type OrderRow = {
  id: string;
  customer: string;
  product: string;
  status: "결제 완료" | "처리 중" | "취소";
  amount: number;
  orderedAt: string;
};

const columns: DataTableColumn<OrderRow>[] = [
  { key: "id", header: "주문", sortable: true },
  { key: "customer", header: "고객", sortable: true },
  { key: "product", header: "상품" },
  {
    key: "status",
    header: "상태",
    render: (value) => {
      const status = String(value);
      const color =
        status === "결제 완료"
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : status === "처리 중"
            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
            : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300";
      return (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${color}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    key: "amount",
    header: "결제 금액",
    sortable: true,
    align: "right",
    render: (value) => `₩${Number(value).toLocaleString()}`,
  },
  { key: "orderedAt", header: "주문일", sortable: true },
];

const orders: OrderRow[] = [
  {
    id: "#1048",
    customer: "김민서",
    product: "Pro UI Kit",
    status: "결제 완료",
    amount: 89000,
    orderedAt: "2026-08-20",
  },
  {
    id: "#1047",
    customer: "이현우",
    product: "Dashboard Pack",
    status: "처리 중",
    amount: 129000,
    orderedAt: "2026-08-19",
  },
  {
    id: "#1046",
    customer: "박서연",
    product: "Starter Bundle",
    status: "결제 완료",
    amount: 49000,
    orderedAt: "2026-08-18",
  },
  {
    id: "#1045",
    customer: "최지호",
    product: "Pro UI Kit",
    status: "취소",
    amount: 89000,
    orderedAt: "2026-08-18",
  },
  {
    id: "#1044",
    customer: "정하린",
    product: "Commerce Kit",
    status: "결제 완료",
    amount: 159000,
    orderedAt: "2026-08-17",
  },
  {
    id: "#1043",
    customer: "윤도현",
    product: "Dashboard Pack",
    status: "처리 중",
    amount: 129000,
    orderedAt: "2026-08-16",
  },
  {
    id: "#1042",
    customer: "한소희",
    product: "Starter Bundle",
    status: "결제 완료",
    amount: 49000,
    orderedAt: "2026-08-15",
  },
];

export const dataTableExamples: CustomDataTableProps<OrderRow>[] = [
  {
    title: "최근 주문",
    description: "검색, 정렬, 선택과 행별 작업을 한 화면에서 관리합니다.",
    columns,
    data: orders,
    searchable: true,
    searchPlaceholder: "고객, 상품 또는 상태 검색",
    selectable: true,
    pageSize: 5,
    emptyMessage: "조건에 맞는 주문이 없습니다.",
    rowActions: [
      { id: "detail", label: "주문 상세" },
      { id: "invoice", label: "영수증 발급" },
      { id: "cancel", label: "주문 취소", separatorBefore: true, danger: true },
    ],
  },
];
