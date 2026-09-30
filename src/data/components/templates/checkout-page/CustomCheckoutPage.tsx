import { CustomAvatar } from "@/data/components/ui/avatar/CustomAvatar";
import { CustomBadge } from "@/data/components/ui/badge/CustomBadge";
import { CustomButton } from "@/data/components/ui/button/CustomButton";
import { CustomInput } from "@/data/components/ui/input/CustomInput";

export type CustomCheckoutPageProps = {
  heading: string;
  subheading: string;
  totalPrice: number;
  primaryActionLabel: string;
};

export const CustomCheckoutPage = ({
  heading,
  subheading,
  totalPrice,
  primaryActionLabel,
}: CustomCheckoutPageProps) => {
  return (
    <section className="@container/checkout mx-auto w-full min-w-0 max-w-6xl">
      <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_-32px_rgba(15,23,42,0.3)] dark:border-slate-700 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-4 py-5 @min-[40rem]/checkout:px-8 dark:border-slate-800">
          <CustomBadge text="Template" color="green" variant="outline" />
          <h1 className="mt-4 break-keep text-2xl font-black tracking-tight text-slate-900 @min-[40rem]/checkout:text-4xl dark:text-slate-100">
            {heading}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 @min-[40rem]/checkout:text-base dark:text-slate-300">
            {subheading}
          </p>
        </div>

        <div className="grid gap-6 px-4 py-6 @min-[40rem]/checkout:px-8 @min-[48rem]/checkout:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div className="min-w-0 space-y-5">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/60">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                연락처 정보
              </p>
              <div className="mt-4 grid gap-3">
                <CustomInput
                  placeholder="이메일 주소"
                  type="email"
                  disabled={false}
                />
                <CustomInput
                  placeholder="수령인 이름"
                  type="text"
                  disabled={false}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/60">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                배송 방법
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ["오늘 출발", "오후 2시 이전 주문 시 당일 출고"],
                  ["안전 포장", "깨지기 쉬운 상품은 완충 포장으로 발송"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] p-5 text-white shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  결제 요약
                </p>
                <p className="mt-1 break-all text-2xl font-black @min-[40rem]/checkout:text-3xl">
                  ₩{totalPrice.toLocaleString()}
                </p>
              </div>
              <CustomAvatar name="Uikki Admin" size="md" online={true} />
            </div>

            <div className="mt-6 space-y-4 rounded-3xl bg-white/5 p-4 ring-1 ring-white/10">
              {[
                ["Starter UI Kit", "₩49,000"],
                ["Priority Support", "₩19,000"],
              ].map(([name, price]) => (
                <div
                  key={name}
                  className="flex flex-wrap items-center justify-between gap-2 text-sm"
                >
                  <span className="text-slate-200">{name}</span>
                  <span className="font-semibold text-white">{price}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl bg-white p-4 text-slate-900 shadow-lg">
              <p className="text-sm font-semibold text-slate-500">
                프로모션 코드
              </p>
              <div className="mt-3 flex flex-col gap-3">
                <CustomInput
                  placeholder="SUMMER2026"
                  type="text"
                  disabled={false}
                />
                <CustomButton label={primaryActionLabel} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
