import thumbnail from "@assets/admin-dashboard-thumbnail.svg";
import { PropControl } from "@/types/component.types";
import { CustomAdminDashboardProps } from "./CustomAdminDashboard";

export const adminDashboardMeta = {
  category: "templates" as const,
  name: "Admin Dashboard",
  description:
    "지표 카드, 차트, 사용량과 데이터 테이블을 조합한 반응형 관리자 대시보드입니다.",
  tags: ["dashboard", "admin", "analytics", "data", "template"],
  aliases: ["관리자 대시보드", "어드민", "분석 화면", "백오피스"],
  updatedAt: new Date("2026-08-20"),
  image: thumbnail,
  propControls: {
    workspaceName: { type: "string", label: "워크스페이스 이름" },
    ownerName: { type: "string", label: "사용자 이름" },
    period: {
      type: "select",
      label: "조회 기간",
      options: ["7일", "30일", "90일"],
    },
    showGrowthChart: { type: "boolean", label: "매출 차트 표시" },
  } as Partial<Record<keyof CustomAdminDashboardProps, PropControl>>,
};
