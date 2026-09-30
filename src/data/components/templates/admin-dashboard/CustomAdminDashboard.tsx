import { useEffect, useState } from "react";
import { CustomBadge } from "@/data/components/ui/badge/CustomBadge";
import { CustomDropdownMenu } from "@/data/components/ui/dropdown-menu/CustomDropdownMenu";
import { CustomProgress } from "@/data/components/ui/progress/CustomProgress";
import { CustomSelect } from "@/data/components/ui/select/CustomSelect";
import {
  CustomDataTable,
  type DataTableColumn,
} from "@/data/components/blocks/data-table/CustomDataTable";

type ActivityRow = {
  id: string;
  member: string;
  event: string;
  status: "완료" | "진행 중" | "검토 필요";
  occurredAt: string;
};

export type CustomAdminDashboardProps = {
  workspaceName?: string;
  ownerName?: string;
  period?: "7일" | "30일" | "90일";
  showGrowthChart?: boolean;
};

const activities: ActivityRow[] = [
  {
    id: "ACT-204",
    member: "김민서",
    event: "새 캠페인 게시",
    status: "완료",
    occurredAt: "10분 전",
  },
  {
    id: "ACT-203",
    member: "박서연",
    event: "결제 보고서 생성",
    status: "진행 중",
    occurredAt: "32분 전",
  },
  {
    id: "ACT-202",
    member: "이현우",
    event: "팀 권한 변경",
    status: "검토 필요",
    occurredAt: "1시간 전",
  },
  {
    id: "ACT-201",
    member: "정하린",
    event: "고객 데이터 내보내기",
    status: "완료",
    occurredAt: "3시간 전",
  },
];

const activityColumns: DataTableColumn<ActivityRow>[] = [
  { key: "member", header: "담당자" },
  { key: "event", header: "활동" },
  {
    key: "status",
    header: "상태",
    render: (value) => {
      const status = String(value);
      return (
        <CustomBadge
          text={status}
          color={
            status === "완료" ? "green" : status === "진행 중" ? "blue" : "red"
          }
          variant="solid"
        />
      );
    },
  },
  {
    key: "occurredAt",
    header: "시간",
    align: "right",
  },
];

const navItems = ["개요", "분석", "주문", "고객", "설정"];
const chartValues = [38, 52, 46, 68, 58, 76, 64, 82, 74, 91, 86, 96];

export const CustomAdminDashboard = ({
  workspaceName = "Uikki Studio",
  ownerName = "황은지",
  period = "30일",
  showGrowthChart = true,
}: CustomAdminDashboardProps) => {
  const [activeNav, setActiveNav] = useState("개요");
  const [selectedPeriod, setSelectedPeriod] = useState(period);

  useEffect(() => {
    setSelectedPeriod(period);
  }, [period]);

  return (
    <section className="@container/dashboard w-full min-w-0 overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-[0_30px_100px_-40px_rgba(15,23,42,0.38)] dark:border-slate-700 dark:bg-slate-950">
      <div className="grid min-h-[760px] @min-[64rem]/dashboard:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-slate-200 bg-slate-950 p-5 text-white @min-[64rem]/dashboard:border-r @min-[64rem]/dashboard:border-b-0 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-black">
              {workspaceName.slice(0, 1)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{workspaceName}</p>
              <p className="text-xs text-slate-400">Admin workspace</p>
            </div>
          </div>

          <nav
            aria-label="대시보드 메뉴"
            className="mt-6 flex gap-2 overflow-x-auto @min-[64rem]/dashboard:flex-col"
          >
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-current={activeNav === item ? "page" : undefined}
                onClick={() => setActiveNav(item)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  activeNav === item
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${activeNav === item ? "bg-white" : index % 2 ? "bg-violet-400" : "bg-slate-600"}`}
                />
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-8 hidden rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 @min-[64rem]/dashboard:block">
            <p className="text-xs font-semibold text-slate-400">이번 달 목표</p>
            <div className="mt-3">
              <CustomProgress label="매출 달성률" value={78} color="indigo" />
            </div>
          </div>
        </aside>

        <main className="@container/dashboard-main min-w-0 p-4 @min-[40rem]/dashboard:p-6 @min-[64rem]/dashboard:p-8">
          <header className="flex flex-col gap-4 @min-[40rem]/dashboard-main:flex-row @min-[40rem]/dashboard-main:items-center @min-[40rem]/dashboard-main:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {activeNav}
              </p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 @min-[40rem]/dashboard-main:text-3xl dark:text-white">
                안녕하세요, {ownerName}님
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                워크스페이스의 핵심 지표와 최근 활동을 확인하세요.
              </p>
            </div>
            <div className="flex flex-wrap items-end gap-2">
              <div className="w-32">
                <CustomSelect
                  label="조회 기간"
                  options={[
                    { value: "7일", label: "최근 7일" },
                    { value: "30일", label: "최근 30일" },
                    { value: "90일", label: "최근 90일" },
                  ]}
                  value={selectedPeriod}
                  onValueChange={(value) =>
                    setSelectedPeriod(
                      value as NonNullable<CustomAdminDashboardProps["period"]>,
                    )
                  }
                />
              </div>
              <CustomDropdownMenu
                label={ownerName}
                items={[
                  { id: "profile", label: "프로필" },
                  { id: "workspace", label: "워크스페이스 설정" },
                  {
                    id: "logout",
                    label: "로그아웃",
                    separatorBefore: true,
                    danger: true,
                  },
                ]}
              />
            </div>
          </header>

          <div className="mt-7 grid gap-4 @min-[32rem]/dashboard-main:grid-cols-2 @min-[56rem]/dashboard-main:grid-cols-4">
            {[
              ["총 매출", "₩24.8M", "+12.5%", "blue"],
              ["신규 고객", "1,248", "+8.2%", "green"],
              ["전환율", "6.42%", "+1.1%p", "violet"],
              ["환불 요청", "18", "-4.3%", "amber"],
            ].map(([label, value, change, tone]) => (
              <article
                key={label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {label}
                  </p>
                  <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 rounded-full ${
                      tone === "blue"
                        ? "bg-blue-500"
                        : tone === "green"
                          ? "bg-emerald-500"
                          : tone === "violet"
                            ? "bg-violet-500"
                            : "bg-amber-500"
                    }`}
                  />
                </div>
                <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">
                  {value}
                </p>
                <p
                  className={`mt-2 text-xs font-bold ${change.startsWith("-") ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}
                >
                  {change}{" "}
                  <span className="font-medium text-slate-400">
                    이전 기간 대비
                  </span>
                </p>
              </article>
            ))}
          </div>

          <div className="mt-4 grid gap-4 @min-[56rem]/dashboard-main:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
            {showGrowthChart && (
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-bold text-slate-950 dark:text-white">
                      매출 추이
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      최근 {selectedPeriod} 일별 결제 금액
                    </p>
                  </div>
                  <CustomBadge text="Live" color="green" variant="outline" />
                </div>
                <div
                  className="mt-6 flex h-44 items-end gap-2"
                  aria-label="매출이 전반적으로 증가하는 막대 차트"
                >
                  {chartValues.map((value, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end"
                    >
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-violet-400 transition-opacity group-hover:opacity-75"
                        style={{ height: `${value}%` }}
                        title={`${index + 1}번째 기간: ${value}`}
                      />
                    </div>
                  ))}
                </div>
              </article>
            )}

            <article className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-400">팀 사용량</p>
              <p className="mt-2 text-3xl font-black">8,420</p>
              <p className="mt-1 text-xs text-slate-400">10,000 이벤트 중</p>
              <div className="mt-6 space-y-5">
                <CustomProgress label="API 이벤트" value={84} color="blue" />
                <CustomProgress label="파일 저장소" value={62} color="green" />
                <CustomProgress label="팀 멤버" value={45} color="amber" />
              </div>
            </article>
          </div>

          <div className="mt-4">
            <CustomDataTable
              title="최근 팀 활동"
              description="워크스페이스에서 발생한 주요 작업입니다."
              columns={activityColumns}
              data={activities}
              searchable={false}
              selectable={false}
              pageSize={4}
              rowActions={[
                { id: "detail", label: "상세 보기" },
                { id: "member", label: "담당자 보기" },
              ]}
            />
          </div>
        </main>
      </div>
    </section>
  );
};
