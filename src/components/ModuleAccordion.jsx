import { useState } from "react";

export default function ModuleAccordion({
  modules,
  completedModules,
  onToggleModule,
}) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!modules || modules.length === 0) {
    return (
      <p className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-500">
        No modules available for this topic yet.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {modules.map((m, idx) => {
        const open = openIndex === idx;
        const completed = completedModules?.includes(idx);

        return (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            {/* Header */}
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : idx)}
              className="w-full flex justify-between items-center px-4 py-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggleModule(idx, !completed);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                />
                <span
                  className={`font-medium ${
                    completed
                      ? "line-through text-gray-400"
                      : "text-gray-900"
                  }`}
                >
                  {m.name}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {open ? "Hide" : "Show"}
              </span>
            </button>

            {/* Body */}
            {open && (
              <div className="px-4 pb-4 text-sm space-y-3 border-t border-gray-100">
                {m.summary && (
                  <p className="text-gray-700 whitespace-pre-line">
                    {m.summary}
                  </p>
                )}

                {m.keyPoints?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">
                      Key points
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {m.keyPoints.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.keyTerms?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.keyTerms.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
