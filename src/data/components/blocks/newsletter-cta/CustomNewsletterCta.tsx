import { CustomBadge } from "@/data/components/ui/badge/CustomBadge";
import { CustomButton } from "@/data/components/ui/button/CustomButton";
import { CustomInput } from "@/data/components/ui/input/CustomInput";

export type CustomNewsletterCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  placeholder: string;
};

export const CustomNewsletterCta = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  placeholder,
}: CustomNewsletterCtaProps) => {
  return (
    <section className="w-full overflow-hidden rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_42%,#eef2ff_100%)] p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] sm:p-8 dark:border-slate-700 dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_42%,#172554_100%)]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <CustomBadge text={eyebrow} color="blue" variant="outline" />
          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            {description}
          </p>
        </div>

        <div className="w-full max-w-xl rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CustomInput
              placeholder={placeholder}
              type="email"
              disabled={false}
            />
            <div className="shrink-0">
              <CustomButton label={ctaLabel} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            주 1회, 실제 프로젝트에 바로 쓸 수 있는 UI 패턴만 골라서
            보내드립니다.
          </p>
        </div>
      </div>
    </section>
  );
};
