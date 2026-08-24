import { PropControl } from "@/types/component.types";

type PropsTableProps = {
  controls: Partial<Record<string, PropControl>>;
};

const PropsTable = ({ controls }: PropsTableProps) => {
  const keys = Object.keys(controls || {});
  
  if (keys.length === 0) return null;

  return (
    <div
      className="mt-8 w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-slate-800 dark:bg-slate-900"
      role="region"
      aria-label="Props 표"
      tabIndex={0}
    >
      <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
        <thead className="bg-gray-50/80 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800 text-gray-900 dark:text-slate-100 font-semibold uppercase text-xs tracking-wider">
          <tr>
            <th scope="col" className="rounded-tl-xl px-6 py-4">Prop Name</th>
            <th scope="col" className="px-6 py-4">Type</th>
            <th scope="col" className="px-6 py-4">Options / Range</th>
            <th scope="col" className="rounded-tr-xl px-6 py-4">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-slate-800/50">
          {keys.map((key) => {
            const ctrl = controls[key];
            if (!ctrl) return null;
            
            return (
              <tr key={key} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {key}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
                    {ctrl.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {(ctrl.type === "select" || ctrl.type === "radio") && ctrl.options ? (
                    <div className="flex flex-wrap gap-1">
                      {ctrl.options.map(opt => (
                        <span key={opt} className="inline-block px-1.5 py-0.5 border border-gray-200 dark:border-slate-700 rounded text-xs bg-white dark:bg-slate-800">"{opt}"</span>
                      ))}
                    </div>
                  ) : ctrl.type === "number" ? (
                    <span className="text-xs">
                      {ctrl.min !== undefined && `min: ${ctrl.min} `}
                      {ctrl.max !== undefined && `max: ${ctrl.max} `}
                      {ctrl.step !== undefined && `step: ${ctrl.step}`}
                    </span>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-600">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {ctrl.label || <span className="text-gray-300 dark:text-gray-600">-</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
