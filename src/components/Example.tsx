import { useId, useState } from "react";
import { Settings2 } from "lucide-react";
import type { RegisteredComponentInfo } from "@/types/component.types";
import PreviewShell from "./preview/PreviewShell";

type ExampleProps = {
  componentInfo: RegisteredComponentInfo;
  exampleData: Record<string, unknown>;
};

const Example = ({ componentInfo, exampleData }: ExampleProps) => {
  const Component = componentInfo.Component;
  const [propsState, setPropsState] = useState(exampleData);
  const controls = componentInfo.propControls || {};
  const controlGroupId = useId();

  const handleChange = (key: string, newValue: unknown) => {
    setPropsState((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return (
    <div className="mb-10 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors duration-300 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700">
      <PreviewShell>
        <div className="animate-fade-up flex w-full justify-center">
          {Component ? <Component {...propsState} /> : null}
        </div>
      </PreviewShell>

      {/* Properties 제어 패널 */}
      <div className="bg-white p-6 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-200">
          <Settings2 size={16} className="text-gray-400" />
          <span>단일 컴포넌트 속성 (Properties) 동적 테스트</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {Object.keys(propsState).map((key) => {
            const control = controls[key] ?? { type: "string" as const };
            const controlType = control.type;
            const val = propsState[key];
            const inputId = `${controlGroupId}-${key}`;

            return (
              <div
                key={String(key)}
                className="flex flex-col gap-1.5 transition-colors focus-within:text-blue-600"
              >
                <label
                  htmlFor={inputId}
                  className="mb-1 text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400"
                >
                  {control.label ?? key}
                </label>

                {controlType === "boolean" ? (
                  <label className="relative inline-flex cursor-pointer items-center pb-1">
                    <input
                      id={inputId}
                      type="checkbox"
                      className="peer sr-only"
                      checked={Boolean(val)}
                      onChange={(e) => handleChange(key, e.target.checked)}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {val ? "활성화됨" : "비활성화됨"}
                    </span>
                  </label>
                ) : controlType === "number" ? (
                  <input
                    id={inputId}
                    type="number"
                    value={Number(val) || 0}
                    min={controlType === "number" ? control.min : undefined}
                    max={controlType === "number" ? control.max : undefined}
                    step={controlType === "number" ? control.step : undefined}
                    onChange={(e) => handleChange(key, Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800"
                  />
                ) : controlType === "select" ? (
                  <select
                    id={inputId}
                    value={String(val)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800"
                  >
                    {controlType === "select" &&
                      control.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                  </select>
                ) : controlType === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      id={inputId}
                      type="color"
                      value={String(val)}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border border-gray-200 bg-white p-1"
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase dark:text-gray-300">
                      {String(val)}
                    </span>
                  </div>
                ) : controlType === "textarea" ? (
                  <textarea
                    id={inputId}
                    value={String(val)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800"
                  />
                ) : controlType === "radio" ? (
                  <div className="flex flex-wrap gap-4 py-1">
                    {controlType === "radio" &&
                      control.options?.map((opt) => (
                        <label
                          key={opt}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <input
                            type="radio"
                            id={`${inputId}-${opt}`}
                            name={`radio-${String(key)}`}
                            value={opt}
                            checked={String(val) === opt}
                            onChange={(e) => handleChange(key, e.target.value)}
                            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {opt}
                          </span>
                        </label>
                      ))}
                  </div>
                ) : (
                  <input
                    id={inputId}
                    type="text"
                    value={String(val)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-gray-900 transition-all outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Example;
